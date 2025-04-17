import Button from 'react-bootstrap/Button';
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


const CreateGame = ({show, handleClose, setGames, games}) => {
  const [newGameName, setNewGameName] = useState('');

  const handleChange = (event) => {
    setNewGameName(event.target.value);
  }

  const createNewGame = async () => {
    const email = localStorage.getItem('email')
    const newGame = {
      "id": generateRandomNumber(),
      "name": newGameName,
      "owner": email,
      "questions": []
    }

    try {
      games.push(newGame);

      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5005/admin/games',
        {games: games},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
    } catch (err) {
      alert(err);
    }
  }

  const generateRandomNumber = () => {
    return Math.floor((Math.random() * 10000000) + Date.now());
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create A New Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Game Name</Form.Label>
          <Form.Control type="Name" placeholder="Name of Your Game" value={newGameName} onChange={handleChange}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {createNewGame(), handleClose()}}>
            Create Game
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateGame;