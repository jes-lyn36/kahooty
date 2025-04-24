import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ErrorPopup = ({errorMessage, showErrorPopup, handleCloseErrorPopup}) => {
  return (
    <Modal 
      show={showErrorPopup} 
      onHide={handleCloseErrorPopup} 
      role="alert" 
      aria-live="assertive"
      aria-describedby="error-text"
      id="error-popup"
    >
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body id="error-text">{errorMessage}</Modal.Body>
      <Modal.Footer>
        <Button data-testid="close-error-button" variant="secondary" onClick={handleCloseErrorPopup}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ErrorPopup