import useMediaQuery from '@mui/material/useMediaQuery';

const ResultScreen = ({results}) => {
  // Calculate the time taken for the user to answer the question.
  const isMobile = useMediaQuery("(max-width:800px)");

  const calculateTimeTaken = (questionStartedAt, answeredAt) => {
    if (!questionStartedAt) {
      return "NA"
    }

    const start = new Date(questionStartedAt);
    const end = new Date(answeredAt);
    const timeTakenInSeconds = (end - start) / 1000;
    return timeTakenInSeconds.toFixed(1);
  }

  let totalPoints = 0;

  return(
    <div style={{fontSize: `calc(100vw / ${isMobile ? 28 : 40})`,}}>
      <h1 id="player-wait-text">Results</h1>
      <p>Points Gained = Points x ((duration - timeTaken) / duration)</p>
      <p>{`---------------------------------------------------------------`}</p>
      <p style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
        {`Question ${"#".padEnd(2)} | ${"Time".padEnd(8)} | Status   | ### Points`}
      </p>
      <p>{`---------------------------------------------------------------`}</p>
      {results.map((result, index) => {
        const correct = result.correct ? "Correct" : "Wrong";
        const timeTaken = calculateTimeTaken(result.questionStartedAt, result.answeredAt);

        const point = result.correct ? sessionStorage.getItem(String(index)) : 0;

        const duration = sessionStorage.getItem(String(index) + "-duration");
        const pointsGained = (point * (duration - timeTaken) / duration).toFixed(1);

        totalPoints += parseFloat(pointsGained);

        const paddedIndex = String(index + 1).padEnd(2);
        const paddedTime = `(${timeTaken} s)`.padEnd(8);
        const paddedCorrect = correct.padEnd(8);
        const paddedPoints = `${pointsGained} points`

        return (<p key={index} style={{fontFamily: 'monospace', whiteSpace: 'pre' }}>Question {paddedIndex} | {paddedTime} | {paddedCorrect} | {paddedPoints}</p>)
      })}
      <p>{`---------------------------------------------------------------`}</p>
      <p style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
        {`Total`.padEnd(12) + `|          |          | ${totalPoints.toFixed(1)} points`}
      </p>
    </div>
  )
}

export default ResultScreen;