import Button from 'react-bootstrap/Button';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

const QuestionEdit = ({question, answers, handleQuestionChange, deleteAnswer, editAnswer, addCorrectAnswer, addAnswer}) => {

  const disableAnswers = (answerId) => {
    if (!answerId) return true;
    if (question.correctAnswers.includes(answerId)) return false;
    if (question.type === "multiple_choice") return false;
    if (question.correctAnswers.length >= 1) return true;
    return false;
  }

  return (
    <>
      <Grid size={6}>
        <TextField id="question-title-intput" fullWidth label="Question title" value={question?.question} onChange={(e) => handleQuestionChange("question", e.target.value)}></TextField>
        <List component="nav" aria-label="main mailbox folders" sx={{ width: '100%'}}>
          {
            answers?.map((answer, index) => (
              <ListItem secondaryAction={
                <IconButton edge="end" aria-label={`Delete answer ${index + 1}`} onClick={() => deleteAnswer(answer.answerId)}>
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
              key={index}
              >
                <TextField label={`Answer ${index + 1}`} variant="standard" value={answer.answer} onChange={(e) => editAnswer(index, e.target.value)}/>
                <Checkbox checked={question?.correctAnswers?.includes(answer.answerId)} disabled ={disableAnswers(answer.answerId)} onChange={(e) => addCorrectAnswer(answer.answerId, e.target.checked)}/>
              </ListItem>
            ))
          }
        </List>
        {
          question?.type !== "judgement" ? 
            <Button role="button" aria-label="Add an answer option" variant="primary" onClick={() => addAnswer()}>Add Answer</Button> : <></>
        }
      </Grid>
    </>
  )

}

export default QuestionEdit