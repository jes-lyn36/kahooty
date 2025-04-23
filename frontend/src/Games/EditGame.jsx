import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';

const EditGame = () => {
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
        alert(err); 
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
  
  return (
    <>
      <h1>Edit Game</h1>
      <Button variant="secondary" onClick={() => navigate('/dashboard')}>Back to Games</Button>
      <Button variant="secondary" onClick={() => saveChange()}>Confirm Changes</Button>
      <TextField fullWidth label="Title" value={game?.name} onChange={(e) => handleGameChange("name", e.target.value)}></TextField>

    </>
  )
}

export default EditGame;