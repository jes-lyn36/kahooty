import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import ConfirmDelete from "../ConfirmDelete";
import AdminStartGamePopup from "../../Sessions/AdminStartGamePopup/AdminStartGamePopup";
import axios from 'axios';
import ErrorPopup from '../../ErrorPopup';
import SessionResultPopup from '../../Sessions/SessionResultPopup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import './DashboardGame.css';
import PastSessionResultPopup from '../../Sessions/PastSessionResultPopup';

const DashboardGame = ({games, setGames, game}) => {
  // Used for confirming a game deletion.
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleCloseConfirmDelete = () => setShowConfirmDelete(false);
  const handleShowConfirmDelete = () => setShowConfirmDelete(true);

  // Used for starting sessions.
  const [showStartGameSession, setShowStartGameSession] = useState(false);

  const handleCloseStartGameSession = () => setShowStartGameSession(false);
  const handleShowStartGameSession = () => setShowStartGameSession(true);

  // Used to see Previous session results
  const [showPastSessionResults, setShowPastSessionResults] = useState(false);

  const handleClosePastSessionResults = () => setShowPastSessionResults(false);
  const handleShowPastSessionResults = () => setShowPastSessionResults(true);

  // Error popups
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleCloseErrorPopup = () => setShowErrorPopup(false);
  const handleShowErrorPopup = () => setShowErrorPopup(true);

  // Used to show and set the game session states.
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    if (game.active) {
      setSessionActive(true);
    }
  }, []);

  // Used to show result popup after stopping a game session.
  const [showResultPopup, setShowResultPopup] = useState(false);

  const handleCloseResultPopup = () => setShowResultPopup(false);
  const handleShowResultPopup = () => setShowResultPopup(true);

  const navigate = useNavigate();

  const totalQuestion = () => {
    return game.questions.length;
  }

  // Counts and returns the total duration of the question.
  const totalDuration = () => {
    let totalDuration = 0;
    game.questions.forEach(question => {
      totalDuration += question.duration
    })
    return totalDuration;
  }

  // Start the game session by mutating it.
  const startGameSession = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5005/admin/game/${game.gameId}/mutate`,
        {
          mutationType: 'START'
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      setSessionActive(true);
      handleShowStartGameSession();
    } catch (err) {
      setErrorMessage(err.response?.data?.error);
      handleShowErrorPopup();
    }
  }

  // Stop the game session by mutating it.
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
      handleShowResultPopup();
    } catch (err) {
      setErrorMessage(err.response?.data?.error);
      handleShowErrorPopup();
    }
  }

  // Used to find the sessionId when the game starts.
  const [sessionId, setSessionId] = useState("");

  const getGameSesssionId = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5005/admin/games', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setSessionId(response.data.games.find((g) => g.gameId === game.gameId).active);
    } catch (err) {
      setErrorMessage(err.response?.data?.error);
      handleShowErrorPopup();
    }
  }

  // If the game state changed, set the sessionId.
  useEffect(() => {
    getGameSesssionId();
  }, [showStartGameSession]);
  
  return (
    <>
      <Card id="dashboard-game-card" style={{ width: '18rem' }}>
        <Card.Img style={{height:"286px", objectFit:"cover"}} variant="top" src={!game.thumbnail || game.thumbnail === "" ? './src/assets/no_image.png' : game.thumbnail} alt={game.thumbnail ? `${game.name} thumbnail` : 'No game image available'}/>
        
        <Card.Body>
          <Card.Title>{game.name}</Card.Title>
        </Card.Body>

        <ListGroup className="list-group-flush">
          <ListGroup.Item>Number of questions: {totalQuestion()}</ListGroup.Item>
          <ListGroup.Item>Total duration: {totalDuration()}</ListGroup.Item>
          <Button 
            name="Start Game Session" 
            variant="outline-secondary" 
            onClick={startGameSession} 
            disabled={sessionActive}
            aria-label={`Start Game Session ${game.name}`}
          >
            {!sessionActive ? <>Start Game Session</> : <>Session Started</>}
          </Button>
          <Button 
            name="Modify Game Session" 
            variant="outline-secondary" 
            onClick={() => {navigate(`/session/${sessionId}`, { state: { game } }); console.log(game)}} 
            disabled={!sessionActive}
            aria-label={`Modify Game Session ${game.name}`}
          > Modify Game Session </Button>
          <Button 
            name="Stop Game Session" 
            variant="outline-secondary" 
            onClick={stopGameSession} 
            disabled={!sessionActive}
            aria-label={`Stop Game Session ${game.name}`}
          > Stop Game Session </Button>
          <Button 
            variant="outline-secondary"
            onClick={handleShowPastSessionResults}
            aria-label={`Show Past Game Session ${game.name}`}
          > Show Past Session Results</Button>
        </ListGroup>

        <Card.Body id="edit-delete-game">
          <div role="group" aria-label={`Actions for game ${game.name}`}>
            <EditIcon 
              role="button" 
              label={`Edit game ${game.name}`} 
              aria-label={`Edit game ${game.name}`} 
              tabIndex={0} 
              onClick={() => navigate(`/game/${game.gameId}`)} 
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  // Used to prevent page scroll on Space.
                  e.preventDefault();
                  navigate(`/game/${game.gameId}`);
                }
              }}
            />
            <DeleteIcon 
              role="button" 
              label={`Delete game ${game.name}`}
              aria-label={`Delete game ${game.name}`} 
              tabIndex={0} 
              onClick={handleShowConfirmDelete}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleShowConfirmDelete();
                }
              }}
            />
          </div>
        </Card.Body>
      </Card>
      <AdminStartGamePopup 
        sessionId={sessionId}
        showStartGameSession={showStartGameSession} 
        handleCloseStartGameSession={handleCloseStartGameSession}
        gameId={game.gameId}
      >
      </AdminStartGamePopup>

      <ErrorPopup
        errorMessage={errorMessage}
        showErrorPopup={showErrorPopup}
        handleCloseErrorPopup={handleCloseErrorPopup}
      />

      <SessionResultPopup 
        sessionId={sessionId}
        showResultPopup={showResultPopup}
        handleCloseResultPopup={handleCloseResultPopup}
        game={game}
      />

      <PastSessionResultPopup
        game={game}
        showPopup={showPastSessionResults}
        handleClosePopup={handleClosePastSessionResults}
      />

      <ConfirmDelete
        showConfirmDelete={showConfirmDelete} 
        handleCloseConfirmDelete={handleCloseConfirmDelete} 
        game={game}
        games={games} 
        setGames={setGames}
      >
      </ConfirmDelete>
    </>
  )
}

export default DashboardGame;