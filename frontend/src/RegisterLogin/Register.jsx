import RegisterLogin from './RegisterLogin/RegisterLogin';

const Register = ({ successJob, token}) => {
  return <RegisterLogin successJob={successJob} token={token} name="register" />
}

export default Register;