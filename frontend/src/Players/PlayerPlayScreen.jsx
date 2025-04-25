import "../General.css";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./PlayerPlayScreen.css";
import QuestionScreen from "./QuestionScreen";
import ResultScreen from "./ResultScreen";
import Spinner from 'react-bootstrap/Spinner';

const PlayerPlayScreen = () => {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [results, setResults] = useState(null);
  const [index, setIndex] = useState(0);

  let curQuestionId = null;
  let interval = null;

  const { playerId } = useParams();
  const [countDown, setCountDown] = useState(1000);

  const getQuestion = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/play/${playerId}/question`);
      setQuestion(response.data.question);
      
      if (curQuestionId !== response.data.question.questionId) {
        curQuestionId = response.data.question.questionId;

        setIndex(prev => {
          const newIndex = prev + 1;
          sessionStorage.setItem(String(prev), response.data.question.points);
          sessionStorage.setItem(String(prev) + "-duration", response.data.question.duration)
          return newIndex
        });

        clearInterval(interval);
        setCountDown(response.data.question.duration);

        interval = setInterval(() => {
          setCountDown(countDown => {
            if (countDown - 1 <= 0) {
              clearInterval(interval);
            }

            return countDown - 1;
          })
        }, 1000)
      }

    } catch {
      setQuestion(null);
    }
  }

  const getAnswers = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/play/${playerId}/answer`);
      setAnswers(response.data.answers);
    } catch {
      setAnswers(null);
    }
  }

  const getResults = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/play/${playerId}/results`);
      setResults(JSON.parse(JSON.stringify(response.data)));
    } catch {
      setResults(null);
    }
  }

  useEffect(() => {
    setInterval(() => {
      getQuestion();
      getAnswers();
      getResults();
    }, 1000);
  }, []);

  return (
    <>
      {((!question && !answers) || results) && (
        <video 
          autoPlay 
          loop 
          muted 
          className="background-video" 
          role="img" 
          aria-label="Background animation of grass blowing in the wind"
        >
          <source src="/Grass.mp4" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
      )}
      { results ? (
        <div className="general-style overlay-content">
          <ResultScreen results={results}/>
        </div>
      ) : answers && question ? (
        <div className="general-style overlay-content">
          Answers
          <QuestionScreen question={question} correctAnswers={answers} playerId={playerId}/>
        </div>
      ) : question ? (
        <div className="general-style overlay-content">
          <h1>Question {index}</h1>
          <QuestionScreen question={question} countDown={countDown} curIndex={index} playerId={playerId}/>
        </div>        
      ) : (
        <main role="main" className="general-style overlay-content">
          <h1 id="player-wait-text">Please wait for the game to start...</h1>
          <Spinner id="player-wait-spinner" animation="border" variant="light" />
        </main>
      )}
    </>
  )
}

export default PlayerPlayScreen;