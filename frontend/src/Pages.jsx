import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import EditGame from './Games/EditGame';
import Button from 'react-bootstrap/Button';

Pages = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const successJob = (token) => {
    localStorage.setItem('token', token);
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
      {token ? (
        <>
          <Button variant="outline-primary" onClick={logout}>Logout</Button>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          &nbsp;|&nbsp;
          <Link to="/login">Login</Link>
        </>
      )}
      <hr />
      <Routes>
        <Route path="/register" element={<Register token={token} successJob={successJob} />} />
        <Route path="/login" element={<Login token={token} successJob={successJob} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/game/:gameId" element={<EditGame />} />
      </Routes>
    </>
  );
}

export default Pages;