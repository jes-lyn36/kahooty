import { DashboardGame } from "./Games/DashboardGame";
import { useEffect, useState } from "react";
import axios from 'axios';

import Button from 'react-bootstrap/Button';

function Dashboard() {
  const [games, setGames] = useState([]);

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
        console.log(response.data.games)
      } catch (err) {
        alert(err);
      }
    }

    getGames();
  }, []);

	return (
		<>
		  <h1>Dashboard</h1>
      <Button variant="secondary">Create Game</Button>

      {games.length > 0 ? (
          games.map((game, index) => (
            <DashboardGame game={game}></DashboardGame>
          ))
        ) :
          <p>No games owned by the account...</p>
      }
		</>
	)
}

export default Dashboard;