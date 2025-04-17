import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ErrorPopup = ({errorMessage, showErrorPopup, handleCloseErrorPopup}) => {
  return (
    <>
      <Modal show={showErrorPopup} onHide={handleCloseErrorPopup}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorPopup}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ErrorPopup