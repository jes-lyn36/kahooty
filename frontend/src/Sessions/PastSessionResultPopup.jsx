import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const PastSessionResultPopup = ({game, showPopup, handleClosePopup}) => {
  const navigate = useNavigate();

  return (
    <>
      <Modal 
        show={showPopup} 
        onHide={handleClosePopup}
        aria-labelledby="past-session-results-modal"
        aria-describedby="past-session-list"
      >
        <Modal.Header closeButton>
          <Modal.Title id="past-session-title">Past Sessions</Modal.Title>
        </Modal.Header>
        <Modal.Body id="past-session-list">
          {game.oldSessions?.map((sessionId) => {
            return(<h5 key={sessionId} style={{cursor: "pointer"}} onClick={() => navigate(`/session/${sessionId}/result`)}>{sessionId}</h5>)
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePopup}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PastSessionResultPopup