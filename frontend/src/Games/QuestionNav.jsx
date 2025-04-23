import Button from 'react-bootstrap/Button';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

const QuestionNav = ({questions, selectedIndex, deleteQuestion, handleListQuestionClick, addQuestion}) => {
	return(
		<>
			<Grid display="flex" flexDirection="column" alignItems="center" size={3}>
				<List component="nav" aria-label="main mailbox folders" sx={{ width: '100%'}}>
					{
					questions?.map((question, index) => (
						<ListItem secondaryAction={
							<IconButton edge="end" aria-label="delete" onClick={() => deleteQuestion(index)}>
							<DeleteIcon />
							</IconButton>
							}
							disablePadding
							key={index}
						>
							<ListItemButton
								selected={selectedIndex === index}
								onClick={() => handleListQuestionClick(index)}
							>
								<ListItemText primary={`Question ${index + 1}`} />
							</ListItemButton>
						</ListItem>
					))
					}
				</List>
				<Button variant="primary" onClick={() => addQuestion()}>Add Question</Button>
			</Grid>
		</>
	)
}

export default QuestionNav;