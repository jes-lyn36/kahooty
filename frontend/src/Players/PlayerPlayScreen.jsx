import "../General.css";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./PlayerPlayScreen.css";
import Spinner from 'react-bootstrap/Spinner';

const PlayerPlayScreen = () => {
  const [question, setQuestion] = useState(null);
  const [results, setResults] = useState(null);

  const { playerId } = useParams();

  const getQuestion = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/play/${playerId}/question`);
      console.log(response.data);
      setQuestion(response.data.question);
    } catch (err) {
      console.log(err.response?.data?.error);
      setQuestion(null);
    }
  }

  const getResults = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/play/${playerId}/results`);
      console.log("HERE")
      console.log(response.data)
      setResults(response.data);
    } catch (err) {
      console.log(err.response?.data?.error);
      setResults(null);
    }
  }

  useEffect(() => {
    setInterval(() => {
      getQuestion();
      getResults();
    }, 1000);
  }, []);

  return (
    <>
      {!question && !results && (
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
      {question && !results ? (
        <div>
          {question.question}
        </div>
      ) : !question && results ? (
        <div>
          results of the game
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