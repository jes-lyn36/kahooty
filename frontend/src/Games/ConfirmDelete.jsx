import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ErrorPopup from '../ErrorPopup';
import { useState } from "react";

const ConfirmDelete = ({
  showConfirmDelete, 
  handleCloseConfirmDelete, 
  game, 
  games, 
  setGames
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleCloseErrorPopup = () => setShowErrorPopup(false);
  const handleShowErrorPopup = () => setShowErrorPopup(true);

  const deleteGame = async () => {
    try {
      const newGames = games.filter((g) => g.gameId !== game.gameId);

      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5005/admin/games',
        {games : newGames},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      setGames(newGames);

    } catch (err) {
      setErrorMessage(err.response?.data?.error);
      handleShowErrorPopup();
    }
  }

  return (
    <>
      <Modal show={showConfirmDelete} onHide={handleCloseConfirmDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Game Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the game?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmDelete}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => { deleteGame(); handleCloseConfirmDelete(); }}>
            Delete Game
          </Button>
        </Modal.Footer>
      </Modal>

      <ErrorPopup
        errorMessage={errorMessage}
        showErrorPopup={showErrorPopup}
        handleCloseErrorPopup={handleCloseErrorPopup}
      />
    </>
  );
}

export default ConfirmDelete;