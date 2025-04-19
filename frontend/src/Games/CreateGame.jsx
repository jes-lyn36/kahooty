import Button from 'react-bootstrap/Button';
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import ErrorPopup from '../ErrorPopup';

const CreateGame = ({show, handleCloseCreateModal, games, setGames}) => {
  const [newGameName, setNewGameName] = useState('');

  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleCloseErrorPopup = () => setShowErrorPopup(false);
  const handleShowErrorPopup = () => setShowErrorPopup(true);

  const handleChange = (event) => {
    setNewGameName(event.target.value);
  }

  const createNewGame = async () => {
    if (newGameName === "") {
      setErrorMessage("Game title cannot be empty.")
      handleShowErrorPopup();
      return;
    }

    const email = localStorage.getItem('email')
    const newGame = {
      "gameId": generateRandomNumber(),
      "name": newGameName,
      "owner": email,
      "active": 0,
      "questions": []
    }

    try {
      games.push(newGame);
      const token = localStorage.getItem('token');
      const response = await axios.put(
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
      setGames(games);

    } catch (err) {
      setErrorMessage(err.response?.data?.error);
      handleShowErrorPopup();
    }
  }

  const generateRandomNumber = () => {
    return Math.floor((Math.random() * 10000000) + Date.now());
  }

  return (
    <>
      <Modal show={show} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create A New Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Game Name</Form.Label>
          <Form.Control type="Name" placeholder="Name of Your Game" value={newGameName} onChange={handleChange}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {createNewGame(), handleCloseCreateModal()}}>
            Create Game
          </Button>
        </Modal.Footer>
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