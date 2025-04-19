import "../General.css";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./PlayerPlayScreen.css";

const PlayerPlayScreen = () => {
  const [question, setQuestion] = useState(null);

  const { playerId } = useParams();

  const getQuestion = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5005/play/${playerId}/question`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      console.log(response.data);
      setQuestion(response.data.question);
    } catch (err) {
      console.log(err);
      setQuestion(null);
    }
  }

  useEffect(() => {
    setInterval(getQuestion, 1000);
  });

  return (
    <>
      {!question && (
        <video autoPlay loop muted className="background-video">
          <source src="/Grass.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      {question ? 
        <div>
          {question.question}
        </div> :
        <div class="general-style" className={!question ? "overlay-content" : ""}>
          <h1 id="player-wait-text">Please wait for the game to start...</h1>
        </div>
      }
    </>
  )
}

export default PlayerPlayScreen;