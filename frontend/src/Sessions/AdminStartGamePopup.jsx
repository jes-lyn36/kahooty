import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './AdminStartGamePopup.css';
import { useState } from "react";

const AdminStartGamePopup = ({sessionId, showStartGameSession, handleCloseStartGameSession, gameId}) => {
  const [copied, setCopied] = useState(false);
  
  let state = {
    value: '',
    copied: false,
  };

  return (
    <>
      <Modal show={showStartGameSession} onHide={handleCloseStartGameSession}>
        <Modal.Header closeButton>
          <Modal.Title>New game session started!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Game SessionId: {sessionId}{' '}
          <CopyToClipboard text={`http://localhost:3000/play/join/${sessionId}`} onCopy={() => setCopied(true)}>
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