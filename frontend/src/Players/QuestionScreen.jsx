import { useState, useEffect } from "react";
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

  // Adapted from: https://stackoverflow.com/questions/21607808/convert-a-youtube-video-url-to-embed-code
  const covertToEmbeddedUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  return(
    <>
      {
        countDown ?? (
          <h2>{countDown}</h2>
        )
      }
      <h2 className="mb-5">{question.question}</h2>


      
      {question && question.attachmentType === "img" ? (
        <div style={{ width: '100%', aspectRatio: '16 / 9', marginBottom:"10px"}}>
          <img 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
            src={question.attachment} 
          />
        </div>
      ) : question && question.attachmentType === "youtube" && (
        <div style={{ width: '100%', aspectRatio: '16 / 9', marginBottom:"10px"}}>
          <iframe 
            src={`https://www.youtube.com/embed/${covertToEmbeddedUrl(question.attachment)}`}
            title="YouTube video preview"
            frameBorder="0"   
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{width: "100%", height: "100%"}}
          />
        </div>
      )}

      <ToggleButtonGroup className="w-100" type="checkbox" vertical value={answers} onChange={handleAnswer}>
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