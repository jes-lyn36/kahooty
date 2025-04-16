import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const EditGame = ({game}) => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Edit Game</h1>
      <Button variant="secondary" onClick={() => navigate('/dashboard')}>Back to Games</Button>
      <Button variant="secondary">Confirm Changes</Button>
    </>
  )
}

export default EditGame;