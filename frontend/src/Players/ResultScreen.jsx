const ResultScreen = ({results}) => {

  const calculateTimeTaken = (questionStartedAt, answeredAt) => {
    if (!questionStartedAt) {
      return "NA"
    }

    const start = new Date(questionStartedAt);
    const end = new Date(answeredAt);
    const timeTakenInSeconds = (end - start) / 1000;
    return timeTakenInSeconds.toFixed(1) + "s";
  }

  let totalPoints = 0;

  return(
    <>
      <h1 id="player-wait-text">Results</h1>
      <h1></h1>
      <h2 style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
        {`Question ${"#".padEnd(2)} | ${"Time".padEnd(8)} | Status   | # Points`}
      </h2>
      <h2>{`-----------------------------------------------------------`}</h2>
      {results.map((result, index) => {
        const correct = result.correct ? "Correct" : "Wrong";
        const timeTaken = calculateTimeTaken(result.questionStartedAt, result.answeredAt);

        let point = result.correct ? sessionStorage.getItem(String(index)) : 0;

        totalPoints += parseInt(point)

        const paddedIndex = String(index + 1).padEnd(2);
        const paddedTime = `(${timeTaken})`.padEnd(8);
        const paddedCorrect = correct.padEnd(8);
        const paddedPoints = `${point} points`

        return (<h2 style={{fontFamily: 'monospace', whiteSpace: 'pre' }}>Question {paddedIndex} | {paddedTime} | {paddedCorrect} | {paddedPoints}</h2>)
      })}
      <h2>{`-----------------------------------------------------------`}</h2>
      <h2 style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
        {`Total`.padEnd(12) + `|          |          | ${totalPoints} points`}
      </h2>
    </>
  )
}

export default ResultScreen;