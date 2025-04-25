import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const SessionResultPopup = ({sessionId, showResultPopup, handleCloseResultPopup, game}) => {
  const navigate = useNavigate();
  
  const resultScreen = () => {
    navigate(`/session/${sessionId}`, { state: { game } });
  }
  
  return (
    <Modal id="admin-game-ended-popup" show={showResultPopup} onHide={handleCloseResultPopup}>
      <Modal.Header closeButton>
        <Modal.Title>Game Session Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>Would you like to view the results?</Modal.Body>
      <Modal.Footer>
        <Button 
          variant="secondary" 
          onClick={handleCloseResultPopup} 
          aria-label="Close result popup"
        >
          Close
        </Button>
        <Button 
          role='button'
          variant="secondary" 
          onClick={resultScreen} 
          aria-label="Navigate to session results screen"
        >
          View Results
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SessionResultPopup;