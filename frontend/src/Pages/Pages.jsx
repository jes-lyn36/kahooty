import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import Register from '../RegisterLogin/Register';
import Login from '../RegisterLogin/Login';
import Dashboard from '../Dashboard/Dashboard';
import EditGame from '../Games/EditGame';
import SessionStart from '../Sessions/SessionStart';
import SessionAdvanceResult from '../Sessions/SessionAdvanceResult';
import PlayerPlayScreen from '../Players/PlayerPlayScreen';
import Button from 'react-bootstrap/Button';
import './Pages.css'; 

const Pages = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const isPlayerRoute = location.pathname.startsWith('/play');

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const successJob = (token, email) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);

    setToken(token);
    navigate('/dashboard');
  }

  const logout = async () => {
    try {
      const response = await axios.post('http://localhost:5005/admin/auth/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      localStorage.removeItem('token');
      setToken(null);
      navigate('/login');
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <>
      {!isPlayerRoute && (
        <>
          {token ? (
            <>
              <Button id="logout-button" variant="outline-primary" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/register">Register</Link>
              &nbsp;|&nbsp;
              <Link to="/login">Login</Link>
            </>
          )}
          <hr />
        </>
      )}
      <Routes>
        <Route path="/" element={<Register token={token} successJob={successJob} />} />
        <Route path="/register" element={<Register token={token} successJob={successJob} />} />
        <Route path="/login" element={<Login token={token} successJob={successJob} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/game/:gameId" element={<EditGame />} />
        <Route path="/play/join/:sessionId" element={<SessionStart />} />
        <Route path="/play/join" element={<SessionStart />} />
        <Route path="/play/:playerId" element={<PlayerPlayScreen />} />
        <Route path="/session/:sessionId" element={<SessionAdvanceResult />} />
      </Routes>
    </>
  );
}

export default Pages;