import DashboardGame from "../Games/DashboardGame/DashboardGame";
import { useEffect, useState } from "react";
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import CreateGame from "../Games/CreateGame";
import "./Dashboard.css";

const Dashboard = () => {
  const [games, setGames] = useState([]);

  // States for the modal to create a new game.
  const [ShowCreateModal, setShowCreateModal] = useState(false);

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);

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
      <div className="side-spacing" role="region" aria-label="Dashboard header and create button">
        <h1>Dashboard</h1>
        <hr/>
        <Button id="create-game-button" variant="secondary" onClick={handleShowCreateModal} aria-label="Create a new game">Create Game</Button>
      </div>
      <CreateGame show={ShowCreateModal} handleCloseCreateModal={handleCloseCreateModal} setGames={setGames} games={games}></CreateGame>
      <div id="dashboard-games" role="region" aria-label="List of games">
        {games.length > 0 ? (
          games.map((game, index) => (
            <DashboardGame games={games} setGames={setGames} game={game} key={index}></DashboardGame>
          ))
        ) : (
          <p>No games owned by the account...</p>
        )}
      </div>
    </>
  )
}

export default Dashboard;