import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {
  Link
} from "react-router-dom";

const DashboardGame = ({game}) => {
  const totalQuestion = () => {
    console.log(game)
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
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Card.Title>{game.name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Number of questions: {totalQuestion()}</ListGroup.Item>
        <ListGroup.Item>Total duration: {totalDuration()}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Link to={`/game/${game.id}`}>Edit Game</Link>
      </Card.Body>
    </Card>
  )
}

export default DashboardGame;