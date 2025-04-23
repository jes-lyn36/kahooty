import Image from 'react-bootstrap/Image';
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div id="landing-container">
      <h1 id="landing-title">BigBrain</h1>
      <h2 id="landing-description">Your reliable, totally not Kahoot, timed quiz app!</h2>
      <Image id="landing-image" src="../src/assets/landing-page-picture.png" fluid />
    </div>
  )
}

export default LandingPage;