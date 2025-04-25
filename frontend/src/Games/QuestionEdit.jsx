import Button from 'react-bootstrap/Button';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Form from 'react-bootstrap/Form';

const QuestionEdit = ({question, answers, handleQuestionChange, deleteAnswer, editAnswer, addCorrectAnswer, addAnswer}) => {

  const disableAnswers = (answerId) => {
    if (!answerId) return true;
    if (question.correctAnswers.includes(answerId)) return false;
    if (question.type === "multiple_choice") return false;
    if (question.correctAnswers.length >= 1) return true;
    return false;
  }

  const fileToDataUrl = (file) => {
    const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
    const valid = validFileTypes.find(type => type === file.type);
    // Bad data, let's walk away.
    if (!valid) {
      throw Error('provided file is not a png, jpg or jpeg image.');
    }
    
    const reader = new FileReader();
    const dataUrlPromise = new Promise((resolve,reject) => {
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
    });
    reader.readAsDataURL(file);
    return dataUrlPromise;
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const extension = file.type.split('/')[1]; // e.g., 'jpg' or 'png'
    const renamedFile = new File([file], `image.${extension}`, { type: file.type });
  
    const dataUrl = await fileToDataUrl(renamedFile);
    handleQuestionChange("attachment", dataUrl);
  };
  

  return (
    <>
      <TextField slotProps={{ inputLabel: { shrink: true } }} id="question-title-input" fullWidth label="Question title" value={question?.question ? question?.question : ""} onChange={(e) => handleQuestionChange("question", e.target.value)}></TextField>
      
      {question && question.attachmentType === "img" ? (
        <Form.Group controlId="formFile">
          <Form.Label>Image attachment</Form.Label>
          <Form.Control type="file" accept="image/png, image/jpeg, image/png" onChange={(e) => handleFileChange(e)}/>
        </Form.Group>
      ) : question && question.attachmentType === "youtube" && (
        <TextField slotProps={{ inputLabel: { shrink: true } }} label={`Youtube link`} variant="standard" value={question.attachment} onChange={(e) => handleQuestionChange("attachment", e.target.value)}/>
      )}

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
              <TextField slotProps={{ inputLabel: { shrink: true } }} label={`Answer ${index + 1}`} variant="standard" value={answer.answer} onChange={(e) => editAnswer(index, e.target.value)}/>
              <Checkbox checked={question?.correctAnswers?.includes(answer.answerId)} disabled ={disableAnswers(answer.answerId)} onChange={(e) => addCorrectAnswer(answer.answerId, e.target.checked)}/>
            </ListItem>
          ))
        }
      </List>
      {
        question?.type !== "judgement" ? 
          <Button role="button" aria-label="Add an answer option" variant="primary" onClick={() => addAnswer()}>Add Answer</Button> : <></>
      }
    </>
  )

}

export default QuestionEdit