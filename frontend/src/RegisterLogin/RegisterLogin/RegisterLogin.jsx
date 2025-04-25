import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import capitalize from 'capitalize';
import ErrorPopup from '../../ErrorPopup';
import "./RegisterLogin.css";

const RegisterLogin = ({ successJob, token, name}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // Used for errors.
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleCloseErrorPopup = () => setShowErrorPopup(false);
  const handleShowErrorPopup = () => setShowErrorPopup(true);

  if (token) {
    navigate('/dashboard');
  }

  // Try to login or register when the user presses submit.
  const tryLoginRegister = async () => {
    if (name === 'register' && password !== confirmPassword) {
      setErrorMessage("Passwords do not match.")
      handleShowErrorPopup();
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5005/admin/auth/${name}`, {
        email: email,
        password: password,
        name: name === "register" ? userName : null
      });
      const token = response.data.token;
      successJob(token, email);
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Something went wrong.");
      handleShowErrorPopup();
    }
  }
  
  return (
    <>
      <div className="side-spacing">
        <Form onSubmit={(e) => { e.preventDefault(); tryLoginRegister(); }}>
          <h1 >{capitalize(name)}</h1><br/>
          <InputGroup className="mb-3">
            <InputGroup.Text id="email-input-title">Email </InputGroup.Text>
            <Form.Control value={email} onChange={e => setEmail(e.target.value)}
              placeholder="123@email.com"
              aria-label="Email"
              type="email"
              aria-describedby="email-input-title"
              id="email-input"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="password-input-title">Password </InputGroup.Text>
            <Form.Control value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Password123"
              aria-label="input password"
              aria-describedby="password-input-title"
              type="password"
              id="password-input"
            />
          </InputGroup>

          {name === 'register' && (
            <>
              <InputGroup className="mb-3">
                <InputGroup.Text id="username-input-title">Username</InputGroup.Text>
                <Form.Control value={userName} onChange={e => setUserName(e.target.value)}
                  placeholder="Your display name"
                  aria-label="Username"
                  type="username"
                  aria-describedby="username-input-title"
                  id="username-input"
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="confirm-password-input-title">Confirm Password</InputGroup.Text>
                <Form.Control value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  aria-label="Confirm password"
                  aria-describedby="confirm-password-input-title"
                  type="password"
                  id="confirm-password-input"
                />
              </InputGroup>
            </>
          )}
          <Button id="submit-login-register-form" type="submit" onClick={tryLoginRegister} variant="primary">Submit</Button>
        </Form>
      </div>

      <ErrorPopup
        errorMessage={errorMessage}
        showErrorPopup={showErrorPopup}
        handleCloseErrorPopup={handleCloseErrorPopup}
      />
    </>
  )
}

export default RegisterLogin;