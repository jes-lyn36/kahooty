import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import QuestionNav from './QuestionNav';
import QuestionEdit from './QuestionEdit';
import QuestionOptions from './QuestionOptions';

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
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5005/admin/games', { 
        games: games
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      navigate('/dashboard');
    } catch (err) {
      alert(err); 
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
      answers: []
    }
    const newGame = game;
    newGame.questions.push(newQuestion);
    setGame(newGame);
    setNumQuestions(numQuestions + 1);
  }
  
  const deleteQuestion = async (index) => {
    if (numQuestions === 1) {
      alert("cannot delete if there is only one question left");
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
      alert("max answers is 6");
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
      alert("min amount of answers is 2");
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
  
  return (
    <>
      <h1>Edit Game</h1>
      <Button variant="secondary" onClick={() => navigate('/dashboard')}>Back to Games</Button>
      <Button variant="secondary" onClick={() => saveChange()}>Confirm Changes</Button>
      <TextField fullWidth label="Title" value={game?.name} onChange={(e) => handleGameChange("name", e.target.value)}></TextField>

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
    </>
  )
}

export default EditGame;