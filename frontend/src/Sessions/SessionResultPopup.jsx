import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const SessionResultPopup = ({sessionId, showResultPopup, handleCloseResultPopup}) => {
  const navigate = useNavigate();
  
  const resultScreen = () => {
    navigate(`/session/${sessionId}`);
  }
  
  return (
    <Modal show={showResultPopup} onHide={handleCloseResultPopup}>
      <Modal.Header closeButton>
        <Modal.Title>Game Session Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>Would you like to view the results?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseResultPopup}>
          Close
        </Button>
        <Button variant="secondary" onClick={resultScreen}>
          View Results
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SessionResultPopup;