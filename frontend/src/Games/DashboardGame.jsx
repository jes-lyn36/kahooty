import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export function DashboardGame({game}) {
  const totalQuestion = () => {
    console.log(game)
    return game.questions;
  }

  const totalDuration = () => {

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
        <Card.Link href="#">Edit Game</Card.Link>
      </Card.Body>
    </Card>
  )
}