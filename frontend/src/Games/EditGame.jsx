import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import QuestionNav from './QuestionNav';
import QuestionEdit from './QuestionEdit';
import QuestionOptions from './QuestionOptions';
import './EditGame.css';
import ErrorPopup from '../ErrorPopup';
import Form from 'react-bootstrap/Form';


const EditGame = () => {
  // Used to show error popup messages.
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleCloseErrorPopup = () => setShowErrorPopup(false);
  const handleShowErrorPopup = () => setShowErrorPopup(true);

  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [game, setGame] = useState({
    name: "",
    questions: []
  });
  const [question, setQuestion] = useState({
    answers: []
  });
  const [answers, setAnswers] = useState([]); 

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [numQuestions, setNumQuestions] = useState(0);

  const generateRandomNumber = () => {
    return Math.floor((Math.random() * 10000000) + Date.now());
  }

  useEffect(() => {
    if (numQuestions !== 0) {
      navigate("/game/" + game.id + "/question/" + question.questionId);
    }
  }, [question]);

  useEffect(() => {
    const gameId = parseInt(window.location.href.split('/')[4]);

    const getGames = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5005/admin/games', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        let game = response.data.games.find(obj => obj.id === gameId);
        setGames(response.data.games);
        setGame(game);
        setQuestion(game.questions[0]);
        setAnswers(game.questions[0].answers);
        setNumQuestions(game.questions.length);
      } catch (err) {
        setErrorMessage(err.response?.data?.error);
        handleShowErrorPopup();
      }      
    }
    
    getGames();
  }, []);

  const saveAnswers = () => {
    let changedQuestion = question;
    changedQuestion.answers = answers;
    setQuestion(changedQuestion);
  }

  const saveQuestion = () => {
    let changedGame = game;
    changedGame.questions[selectedIndex] = question;
    setGame(changedGame);
  }

  const saveGame = () => {
    let gameIndex = games.findIndex((prevGame) => prevGame.id === game.id);
    let changedGames = games;
    changedGames[gameIndex] = game;
    setGames(changedGames);
  }

  const handleListQuestionClick = async (index) => {
    saveQuestion();
    setSelectedIndex(index);
    saveAnswers();
    setQuestion(game.questions[index]);
    setAnswers(game.questions[index].answers)
  };

  const handleQuestionChange = (changedKey, changedValue) => {
    const obj = question;
    const entries = Object.entries(obj).map(([key, value]) => key === changedKey ? [key, changedValue] : [key, value]);
    const result = Object.fromEntries(entries);

    if (changedKey === "type") {
      result.correctAnswers = [];
    }

    if (changedKey === "type" && changedValue === "judgement") {
      result.answers = [
        {
          answerId: generateRandomNumber(),
          answer: "True"
        },
        {
          answerId: generateRandomNumber(),
          answer: "False"
        }
      ]
    }

    if (changedKey === "attachmentType") {
      result.attachment = "";
    }

    setQuestion(result);
    setAnswers(result.answers);
  }

  const handleGameChange = (changedKey, changedValue) => {
    const obj = game;
    const entries = Object.entries(obj).map(([key, value]) => key === changedKey ? [key, changedValue] : [key, value]);
    const result = Object.fromEntries(entries);
    setGame(result);
  }

  const saveChange = async () => {
    saveAnswers();
    saveQuestion();
    saveGame();

    // Make the game has a title.
    if (game.name === "") {
      setErrorMessage('Game title cannot be an empty string.');
      handleShowErrorPopup();
      return;
    }

    // Make sure none of the questions are empty.
    if (game.questions.some((q) => q.question === "")) {
      setErrorMessage('Game questions cannot be an empty string.');
      handleShowErrorPopup();
      return;
    }

    const hasEmptyAnswer = game.questions.some((q) =>
      q.answers.some((a) => a.answer.trim() === "")
    );
    
    // Make sure none of the answer options are empty.
    if (hasEmptyAnswer) {
      setErrorMessage('Answers cannot be empty.');
      handleShowErrorPopup();
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5005/admin/games', { 
        games: games
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err.response?.data?.error);
      handleShowErrorPopup();
    }
  }

  const addQuestion = async () => {
    const newQuestion = {
      questionId: generateRandomNumber(),
      question: "",
      duration: 1,
      type: "multiple_choice",
      points: 1,
      attachment: "",
      correctAnswers: [],
      answers: [
        {
          answerId: generateRandomNumber(),
          answer: ""
        },
        {
          answerId: generateRandomNumber(),
          answer: ""
        }
      ]
    }
    const newGame = game;
    newGame.questions.push(newQuestion);
    setGame(newGame);
    setNumQuestions(numQuestions + 1);
  }
  
  const deleteQuestion = async (index) => {
    if (numQuestions === 1) {
      setErrorMessage("Cannot delete if there is only one question left.");
      handleShowErrorPopup();
      return;
    }

    const questions = game.questions;
    questions.splice(index, 1);
    setGame({...game, questions: questions})

    // if deleted questions is equal to current question, then
    // go to the previous question
    if (index <= selectedIndex && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      setQuestion(game.questions[selectedIndex - 1]);
    } else {
      // this is for the case where the first question is deleted
      setQuestion(game.questions[selectedIndex]);
    }
    setNumQuestions(numQuestions - 1);
  }

  const editAnswer = (index, text) => {
    let editedAnswer = answers[index];
    editedAnswer.answer = text;
    setAnswers(answers.with(index, editedAnswer));
  }
  
  const addAnswer = () => {
    if (answers.length >= 6) {
      setErrorMessage("The maximum answer options is 6.");
      handleShowErrorPopup();
      return;
    }

    const answer = {
      answerId: generateRandomNumber(),
      answer: ""
    }
    const changedAnswer = answers;
    changedAnswer.push(answer);
    setQuestion({...question, answers: answers});
    setAnswers(changedAnswer);
  }

  const addCorrectAnswer = (answerId, checked) => {
    const correctAnswers = question.correctAnswers;
    if (checked) {
      correctAnswers.push(answerId);
    } else {
      correctAnswers.splice(correctAnswers.indexOf(answerId), 1)
    }
    setQuestion({...question, correctAnswers: correctAnswers});
  }

  const deleteAnswer = (answerId) => {
    if (answers.length === 2) {
      setErrorMessage("The minimum in amount of answers is 2.");
      handleShowErrorPopup();
      return;
    }
    
    const index = answers.findIndex(answer => answer.answerId === answerId);
    const answerRemoved = answers;
    answerRemoved.splice(index, 1);

    if (question.correctAnswers.includes(answerId)) {
      addCorrectAnswer(answerId, false);
    }

    setAnswers([...answerRemoved]);
    setQuestion({...question, answers: answerRemoved});
  }

  const fileToDataUrl = (file) => {
    const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
    const valid = validFileTypes.find(type => type === file.type);
    // Bad data, let's walk away.
    if (!valid) {
      throw Error('provided file is not a png, jpg or jpeg image.');
    }
    
    const reader = new FileReader();
    const dataUrlPromise = new Promise((resolve,reject) => {
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
    });
    reader.readAsDataURL(file);
    return dataUrlPromise;
  }
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const extension = file.type.split('/')[1]; // e.g., 'jpg' or 'png'
    const renamedFile = new File([file], `image.${extension}`, { type: file.type });
  
    const dataUrl = await fileToDataUrl(renamedFile);
    handleGameChange("thumbnail", dataUrl);
  };
  
  return (
    <div className="side-spacing">
      <h1>Edit Game</h1>
      <Button aria-label="Go back to games" variant="secondary" onClick={() => navigate('/dashboard')}>Back to Games</Button>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <Button role="button" aria-label="Confirm and save changes" variant="secondary" onClick={() => saveChange()}>Confirm Changes</Button><br/>
      <hr/><br/>
      <TextField id="input-new-game-title" fullWidth label="Title" value={game?.name} onChange={(e) => handleGameChange("name", e.target.value)}></TextField>
      <Form.Group controlId="formFile">
        <Form.Label>Change Thumbnail</Form.Label>
        <Form.Control type="file" accept="image/png, image/jpeg, image/png" onChange={(e) => handleFileChange(e)}/>
      </Form.Group>

      <Grid container spacing={2} mt={2}>
        <QuestionNav
          questions={game.questions}
          selectedIndex={selectedIndex}
          deleteQuestion={deleteQuestion}
          handleListQuestionClick={handleListQuestionClick} 
          addQuestion={addQuestion}
        />
        
        <QuestionEdit 
          question={question} 
          answers={answers}
          handleQuestionChange={handleQuestionChange}
          deleteAnswer={deleteAnswer}
          editAnswer={editAnswer}
          addCorrectAnswer={addCorrectAnswer}
          addAnswer={addAnswer}
        />

        <QuestionOptions
          question={question}
          handleQuestionChange={handleQuestionChange}
        />
      </Grid>

      <ErrorPopup
        errorMessage={errorMessage}
        showErrorPopup={showErrorPopup}
        handleCloseErrorPopup={handleCloseErrorPopup}
      />
    </div>
  )
}

export default EditGame;