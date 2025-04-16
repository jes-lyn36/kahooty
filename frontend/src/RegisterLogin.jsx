import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import capitalize from 'capitalize';

function RegiserLogin({ successJob, token, name }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  if (token) {
    navigate('/dashboard');
  }

  const tryLoginRegister = async () => {
    try {
      const response = await axios.post(`http://localhost:5005/admin/auth/${name}`, {
        email: email,
        password: password,
      });
      const token = response.data.token;
      successJob(token);
    } catch (err) {
      console.log(err);
      alert(err.response.data.error);
    }
  }
  
  return (
    <>
      <h1>{capitalize(name)}</h1><br/>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Email </InputGroup.Text>
        <Form.Control value={email} onChange={e => setEmail(e.target.value)}
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Password </InputGroup.Text>
        <Form.Control value={password} onChange={e => setPassword(e.target.value)}
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <Button onClick={tryLoginRegister} variant="primary">Submit</Button>
    </>
  )
}

export default RegiserLogin;