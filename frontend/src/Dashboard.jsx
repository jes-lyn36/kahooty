import DashboardGame from "./Games/DashboardGame";
import { useEffect, useState } from "react";
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import CreateGame from "./Games/CreateGame";

const Dashboard = () => {
  const [games, setGames] = useState([]);

  // States for the modal to create a new game.
  const [ShowCreateModal, setShowCreateModal] = useState(false);

  const handleClose = () => setShowCreateModal(false);
  const handleShow = () => setShowCreateModal(true);

  useEffect(() => {
    const getGames = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5005/admin/games', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setGames(response.data.games);
      } catch (err) {
        alert(err);
      }
    }

    getGames();
  }, []);

	return (
		<>
		  <h1>Dashboard</h1>
      <Button variant="secondary" onClick={handleShow}>Create Game</Button>
      <CreateGame show={ShowCreateModal} handleClose={handleClose} setGames={setGames} games={games}></CreateGame>

      {games.length > 0 ? (
          games.map((game, index) => (
            <DashboardGame games={games} setGames={setGames} game={game}></DashboardGame>
          ))
        ) :
          <p>No games owned by the account...</p>
      }
		</>
	)
}

export default Dashboard;