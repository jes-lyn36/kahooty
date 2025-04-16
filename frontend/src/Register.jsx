import { useState } from 'react';

import RegisterLogin from './RegisterLogin';
Register = ({ successJob, token }) => {
  return <RegisterLogin successJob={successJob} token={token} name="register" />
}

export default Register;