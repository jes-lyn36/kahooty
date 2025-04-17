import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import ConfirmDelete from "./ConfirmDelete";

const DashboardGame = ({games, setGames, game}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleCloseConfirmDelete = () => setShowConfirmDelete(false);
  const handleShowConfirmDelete = () => setShowConfirmDelete(true);

  const totalQuestion = () => {
    return game.questions.length;
  }

  const totalDuration = () => {
    let totalDuration = 0;
    game.questions.forEach(question => {
      totalDuration += question.duration
    })
    return totalDuration;
  }
  
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={game.thumbnail ? game.thumbnail : './src/assets/no_image.png'} />
      <Card.Body>
        <Card.Title>{game.name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Number of questions: {totalQuestion()}</ListGroup.Item>
        <ListGroup.Item>Total duration: {totalDuration()}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Link to={`/game/${game.id}`}>Edit Game</Link>
        <Button onClick={handleShowConfirmDelete}>Delete Game</Button>
        <ConfirmDelete
          showConfirmDelete={showConfirmDelete} 
          handleCloseConfirmDelete={handleCloseConfirmDelete} 
          game={game}
          games={games} 
          setGames={setGames}
        >
        </ConfirmDelete>
      </Card.Body>
    </Card>
  )
}

export default DashboardGame;