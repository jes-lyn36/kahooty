import Button from 'react-bootstrap/Button';
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import ErrorPopup from '../ErrorPopup';

const CreateGame = ({show, handleCloseCreateModal, games, setGames}) => {
  const [newGameName, setNewGameName] = useState(null);
  const [newGameJSON, setNewGameJSON] = useState('');

  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleCloseErrorPopup = () => setShowErrorPopup(false);
  const handleShowErrorPopup = () => setShowErrorPopup(true);

  const handleChange = (event) => {
    setNewGameName(event.target.value);
  }

  const clearFormData = () => {
    // Reset the values of create game form form is closed.
    setNewGameName('');
    setNewGameJSON('');
  }

  const handleChangeJSON = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
      const text = await file.text();
      setNewGameJSON(text)

    } catch {
      clearFormData();
      setErrorMessage("Failed to read or parse the file.")
      handleShowErrorPopup();
      return;
    }
  }

  const addIdsToGame = (game) => {
    return {
      ...game,
      gameId: generateRandomNumber(),
      questions: game.questions.map((q) => ({
        ...q,
        questionId: generateRandomNumber(),
        answers: q.answers.map((a) => ({
          ...a,
          answerId: generateRandomNumber(),
        })),
      })),
    };
  }

  const createNewGame = async () => {
    if (newGameName === "" && newGameJSON == "") {
      clearFormData();
      setErrorMessage("None of the fields are filled. Only one must be filled.")
      handleShowErrorPopup();
      return;
    }

    if (newGameName !== "" && newGameJSON !== "") {
      clearFormData();
      setErrorMessage("Both of the fields are filled. Only one must be filled.")
      handleShowErrorPopup();
      return;
    }

    let newGame;
    if (newGameJSON == "") {
      const email = localStorage.getItem('email')
      newGame = {
        "gameId": generateRandomNumber(),
        "name": newGameName,
        "owner": email,
        "thumbnail": "",
        "active": 0,
        "questions": [
          {
            "questionId": generateRandomNumber(),
            "question": "",
            "duration": 1,
            "type": "multiple_choice",
            "points": 1,
            "attachmentType": "none",
            "attachment": "",
            "correctAnswers": [],
            "answers": [
              {
                "answerId": generateRandomNumber(),
                "answer": ""
              }, 
              {
                "answerId": generateRandomNumber(),
                "answer": ""
              }
            ]
          }
        ]
      }
    } else {
      try {
        const jsonData = JSON.parse(newGameJSON);

        if (validateJSON(jsonData)) {
          newGame = addIdsToGame(jsonData);
        } else {
          clearFormData();
          setErrorMessage("The JSON file is not in the correct format for a game.")
          handleShowErrorPopup();
          return;
        }
      } catch {
        clearFormData();
        setErrorMessage("The file is not a JSON file.")
        handleShowErrorPopup();
        return;
      }
    }

    try {
      games.push(newGame);
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5005/admin/games',
        {
          games: games
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      clearFormData();
      setGames(games);

    } catch (err) {
      clearFormData();
      setErrorMessage(err.response?.data?.error);
      handleShowErrorPopup();
    }
  }

  const generateRandomNumber = () => {
    return Math.floor((Math.random() * 10000000) + Date.now());
  }

  const validateJSON = (obj) => {
    const email = localStorage.getItem('email')
    if (
      typeof obj !== 'object' ||
      typeof obj.name !== 'string' ||
      obj.owner !== email ||
      typeof obj.active !== 'number' ||
      typeof obj.thumbnail !== 'string' ||
      !Array.isArray(obj.questions)
    ) {
      return false;
    }
  
    for (const question of obj.questions) {
      if (
        typeof question.question !== 'string' ||
        typeof question.duration !== 'number' ||
        typeof question.type !== 'string' ||
        typeof question.points !== 'number' ||
        typeof question.attachment !== 'string' ||
        !Array.isArray(question.correctAnswers) ||
        !Array.isArray(question.answers)
      ) {
        return false;
      }
  
      for (const answer of question.answers) {
        if (
          typeof answer.answer !== 'string'
        ) {
          return false;
        }
      }
    }

    return true;
  }

  return (
    <>
      <Modal id="create-new-game-form" show={show} onHide={handleCloseCreateModal}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            createNewGame();
            clearFormData();
            handleCloseCreateModal();
          }}
        >
          <Modal.Header>
            <Modal.Title>Create A New Game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Game Name</Form.Label>
            <Form.Control id="new-game-name" type="Name" placeholder="Name of Your Game" value={newGameName} onChange={handleChange}/><br/>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload a JSON file of the game</Form.Label>
              <Form.Control type="file" onChange={handleChangeJSON}/>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {handleCloseCreateModal(); clearFormData();}}>
              Cancel
            </Button>
            <Button id="create-new-game" variant="primary" onClick={() => {createNewGame(), handleCloseCreateModal()}}>
              Create Game
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ErrorPopup
        errorMessage={errorMessage}
        showErrorPopup={showErrorPopup}
        handleCloseErrorPopup={handleCloseErrorPopup}
      />
    </>
  );
}

export default CreateGame;