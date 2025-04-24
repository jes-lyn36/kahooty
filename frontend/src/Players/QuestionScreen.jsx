import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';


const QuestionScreen = ({question, countDown, correctAnswers, curIndex, playerId}) => {

  const [answers, setAnswers] = useState([]);
  const [index, setIndex] = useState(0);

  if (curIndex !== index) {
    setIndex(curIndex)
    setAnswers([])
  }

  useEffect(() => {

    if (correctAnswers) {
      setAnswers(correctAnswers)
    } else {
      axios.put(`http://localhost:5005/play/${playerId}/answer`, {
        answers: answers
      });
    }
  }, [answers]);

  const handleAnswer = (val) => {
    setAnswers(val);
  }

  const getVariant = (answerId) => {
    if (correctAnswers && correctAnswers.includes(answerId)) {
      return "success";
    } else if (!correctAnswers && answers.includes(answerId)) {
      return "primary"
    }

    return "outline-dark"
  }

  return(
    <>
      {
        countDown ?? (
          <h2>{countDown}</h2>
        )
      }
      <h2 className="mb-5">{question.question}</h2>
      <ToggleButtonGroup className="w-50" type="checkbox" vertical value={answers} onChange={handleAnswer}>
        {
          question.answers.map((answer, index) => (
            <ToggleButton className="mb-2 rounded-pill" key={index} id={`toggle-${answer.answerId}`} variant={getVariant(answer.answerId)} value={answer.answerId}>
              {answer.answer}
            </ToggleButton>
          ))
        } 
      </ToggleButtonGroup>
    </>
  )
}

export default QuestionScreen;