import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';

const AdminSessionResult = () => {
  const { sessionId } = useParams();
  let results;
  let sessionStatus;
  let questions;
  const [players, setPlayers] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getResults();
  }, []);

  // Get the results of the game session.
  const getResults = async () => {
    const token = localStorage.getItem('token');
    let response = await axios.get(`http://localhost:5005/admin/session/${sessionId}/status`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    sessionStatus = response.data.results;
    questions = sessionStatus.questions;

    response = await axios.get(`http://localhost:5005/admin/session/${sessionId}/results`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    results = response.data.results;

    const playerList = [];
    const questionList = [];

    questions.forEach(_ => {
      questionList.push({
        numAnswers: 0,
        totalTimeTaken: 0
      });
    });
    
    for (const player of results) {
      if (players.some((p) => p.name === player.name)) continue;
      let totalPoints = 0;
      for (const index in player.answers) {
        if (player.answers[index].answers.length === 0) continue;

        const questionDuration = questions[index].duration;

        const timeTaken = Math.abs(new Date(player.answers[index].answeredAt) - new Date(player.answers[index].questionStartedAt))/ 1000
        const points = questions[index].points * ((questionDuration - timeTaken) / questionDuration).toFixed(1);

        questionList[index].numAnswers++;
        questionList[index].totalTimeTaken += timeTaken;

        if (!player.answers[index].correct) continue;
        totalPoints += points;
      }

      playerList.push({
        name: player.name,
        points: totalPoints.toFixed(1)
      })
    }
    
    // Input the game session results into the Mui chart.
    setChartData(questionList.map((question, index) => ({
      question: `Question ${index + 1}`,
      avgTime: (question.totalTimeTaken / question.numAnswers).toFixed(2)
    })));
    setPlayers(playerList);
  }

  return(
    <div className="text-center" style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
      <h1>Results</h1>
      <h5 style={{whiteSpace: "pre-wrap"}}>Points Gained = Points x ((duration - timeTaken) / duration)</h5>
      <h4>{`---------------------------`}</h4>
      <h4>{`#  | Name        |  Points`}</h4>
      <h4>{`---------------------------`}</h4>
      {players?.sort((a, b) => b.points - a.points).slice(0, 5).map((player, index) => {
        const rank = String(index + 1).padEnd(3);
        const name = player.name.padEnd(12);
        const points = String(player.points).padStart(3);

        return (
          <h4 key={index} style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
            {`${rank}| ${name}| ${points} pts`}
          </h4>
        );
      })}
      <h4>{`---------------------------`}</h4>
      <BarChart
        xAxis={[{ scaleType: 'band', data: chartData.map(d => d.question), label: 'Question' }]}
        series={[{ data: chartData.map(d => d.avgTime), label: 'Avg Time (s)' }]}
        height={300}
      />
    </div>
  )
}


export default AdminSessionResult;