import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './AdminStartGamePopup.css';

const AdminStartGamePopup = ({sessionId, showStartGameSession, handleCloseStartGameSession}) => {
  return (
    <>
      <Modal show={showStartGameSession} onHide={handleCloseStartGameSession}>
        <Modal.Header closeButton>
          <Modal.Title>New game session started!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Game SessionId: {sessionId}{' '}
          <CopyToClipboard text={`http://localhost:3000/play/join/${sessionId}`}>
            <span className="copy-link">(Copy Link)</span>
          </CopyToClipboard>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseStartGameSession}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AdminStartGamePopup;