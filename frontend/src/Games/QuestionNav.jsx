import Button from 'react-bootstrap/Button';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

const QuestionNav = ({questions, selectedIndex, deleteQuestion, handleListQuestionClick, addQuestion}) => {
  return(
    <>
      <List component="nav" aria-label="List of editable game questions" sx={{ width: '100%'}}>
        {
          questions?.map((question, index) => (
            <ListItem secondaryAction={
              <IconButton edge="end" aria-label={`Delete Question ${index + 1}`} onClick={() => deleteQuestion(index)}>
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
            key={index}
            >
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => handleListQuestionClick(index)}
                aria-current={selectedIndex === index ? "true" : undefined}
              >
                <ListItemText primary={`Question ${index + 1}`} />
              </ListItemButton>
            </ListItem>
          ))
        }
      </List>
      <Button
        role="button" 
        variant="primary" 
        onClick={() => addQuestion()}
        aria-label="Add a new question to the game"
      >
        Add Question
      </Button>
    </>
  )
}

export default QuestionNav;