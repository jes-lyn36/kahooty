import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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


  return (
    <>
    </>
  )
}

export default EditGame;