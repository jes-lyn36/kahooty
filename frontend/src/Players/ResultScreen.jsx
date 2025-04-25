const ResultScreen = ({results}) => {

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
    <>
      <h1 id="player-wait-text">Results</h1>
      <h2>Points Gained = Points x ((duration - timeTaken) / duration)</h2>
      <h2>{`-----------------------------------------------------------`}</h2>
      <h2 style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
        {`Question ${"#".padEnd(2)} | ${"Time".padEnd(8)} | Status   | ### Points`}
      </h2>
      <h2>{`-----------------------------------------------------------`}</h2>
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

        return (<h2 key={index} style={{fontFamily: 'monospace', whiteSpace: 'pre' }}>Question {paddedIndex} | {paddedTime} | {paddedCorrect} | {paddedPoints}</h2>)
      })}
      <h2>{`-----------------------------------------------------------`}</h2>
      <h2 style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
        {`Total`.padEnd(12) + `|          |          | ${totalPoints.toFixed(1)} points`}
      </h2>
    </>
  )
}

export default ResultScreen;