import RegisterLogin from './RegisterLogin';

const Login = ({ successJob, token }) => {
  return <RegisterLogin successJob={successJob} token={token} name="login" />
}

export default Login;