import { useState, useEffect } from 'react';
import axios from 'axios';
import {
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
import LandingPage from '../LandingPage/LandingPage';
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
      await axios.post('http://localhost:5005/admin/auth/logout', {}, {
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
        <nav aria-label="User authentication methods">
          {token ? (
            <>
              <Button 
                id="logout-button" 
                variant="outline-primary" 
                onClick={logout} 
                aria-label="Log out of your account"
                name="logout-nav-link"
              >
                Logout
              </Button>
            </>
          ) : (
            <nav aria-label="User authentication" id="auth-nav">
              <Link name="register-nav-link" to="/register" className="auth-link">Register</Link>
              <span id="auth-separator">|</span>
              <Link name="login-nav-link" to="/login" className="auth-link">Login</Link>
            </nav>
          )}
          <hr />
        </nav>
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register token={token} successJob={successJob} />} />
        <Route path="/login" element={<Login token={token} successJob={successJob} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/game/:gameId" element={<EditGame />} />
        <Route path="/game/:gameId/question/:questionId" element={<EditGame />} />
        <Route path="/play/join/:sessionId" element={<SessionStart />} />
        <Route path="/play/join" element={<SessionStart />} />
        <Route path="/play/:playerId" element={<PlayerPlayScreen />} />
        <Route path="/session/:sessionId" element={<SessionAdvanceResult />} />
      </Routes>
    </>
  );
}

export default Pages;