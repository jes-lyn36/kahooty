import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import ErrorPopup from '../ErrorPopup';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const SessionAdvanceResult = () => {
  const location = useLocation();
  const game = location.state?.game;
  
  // Error Popups
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleCloseErrorPopup = () => setShowErrorPopup(false);
  const handleShowErrorPopup = () => setShowErrorPopup(true);

  const navigate = useNavigate();

  const advanceGameSession = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5005/admin/game/${game.gameId}/mutate`,
        {
          mutationType: 'ADVANCE'
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
    } catch (err) {
      setErrorMessage(err.response?.data?.error);
      handleShowErrorPopup();
    }
    getGameStatus();
  }

  // Used to show and set the game session states.
  const [sessionActive, setSessionActive] = useState(false);
  const { sessionId } = useParams();

  useEffect(() => {
    getGameStatus();
  }, [sessionActive]);

  const getGameStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5005/admin/session/${sessionId}/status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.data.results.active) {
        setSessionActive(true);
      } else {
        setSessionActive(false);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.error);
      handleShowErrorPopup();      
    }
  }

  const stopGameSession = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5005/admin/game/${game.gameId}/mutate`,
        {
          mutationType: 'END'
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      setSessionActive(false);
    } catch (err) {
      setErrorMessage(err.response?.data?.error);
      handleShowErrorPopup();
    }
  }

  return (
    <main>
      <h1>Advance Result screen</h1>
      <hr/>
      <Button aria-label="Go back to dashboard" onClick={() => navigate('/Dashboard')}>Back to Dashboard</Button>
      <Button aria-label="Advance to the next stage of the game" onClick={advanceGameSession} disabled={!sessionActive}>Advance</Button>
      <Button 
        aria-label={sessionActive ? "Stop the game session" : "Session has already ended"}
        aria-live="polite" 
        variant="outline-secondary" 
        onClick={stopGameSession} 
        disabled={!sessionActive}
      >
        {sessionActive ? <>Stop Game Session</> : <>Session Ended</>}
      </Button>

      <ErrorPopup
        errorMessage={errorMessage}
        showErrorPopup={showErrorPopup}
        handleCloseErrorPopup={handleCloseErrorPopup}
      />
    </main>
  )
}

export default SessionAdvanceResult;