import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ErrorPopup from '../ErrorPopup';
import axios from 'axios';
import "../General.css";

const SessionStart = () => {
  const [name, setName] = useState("");

  const [inputSessionId, setInputSessionId] = useState(null);
  const { sessionId } = useParams();

  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleCloseErrorPopup = () => setShowErrorPopup(false);
  const handleShowErrorPopup = () => setShowErrorPopup(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId) {
      setInputSessionId(sessionId);
    }
  }, [sessionId]);

  const joinGame = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:5005/play/join/${inputSessionId}`, 
        {
          name: name
        }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      navigate(`/play/${response.data.playerId}`);
      console.log(response);
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Unable to join game.");
      handleShowErrorPopup();
    }
  }

  return (
    <div class="general-style">
      <h1>Session Start Screen</h1>
      <hr/>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Session Id</InputGroup.Text>
        <Form.Control
          placeholder="12345"
          aria-label="Your Session Id"
          aria-describedby="basic-addon1"
          value={sessionId}
          onChange={(e) => setInputSessionId(e.target.value)}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
        <Form.Control
          placeholder=""
          aria-label="Name123"
          aria-describedby="basic-addon1"
          onChange={(e) => setName(e.target.value)}
        />
      </InputGroup>
      <Button variant="secondary" onClick={joinGame}>Submit</Button>

      <ErrorPopup
        errorMessage={errorMessage}
        showErrorPopup={showErrorPopup}
        handleCloseErrorPopup={handleCloseErrorPopup}
      />
    </div>
  )
}

export default SessionStart;