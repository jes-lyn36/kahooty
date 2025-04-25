
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const QuestionOptions = ({question, handleQuestionChange}) => {

  return (
    <>
      <Grid size={3}>
        <FormControl fullWidth>
          <InputLabel id="question-type-label">Type</InputLabel>
          <Select
            labelId="question-type-label
            "
            id="demo-simple-select"
            value={question?.type ?? "multiple_choice"}
            label="Type"
            onChange={(e) => handleQuestionChange("type", e.target.value)}
          >
            <MenuItem value={"multiple_choice"}>Multiple choice</MenuItem>
            <MenuItem value={"single_choice"}>Single choice</MenuItem>
            <MenuItem value={"judgement"}>Judgement</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ my: 2 }} fullWidth>
          <InputLabel id="question-type-label">Attachment</InputLabel>
          <Select
            labelId="question-type-label
            "
            id="demo-simple-select"
            value={question?.attachmentType ?? ""}
            label="Type"
            onChange={(e) => handleQuestionChange("attachmentType", e.target.value)}
          >
            <MenuItem value={"none"}>None</MenuItem>
            <MenuItem value={"youtube"}>Youtube</MenuItem>
            <MenuItem value={"img"}>Image</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="question-duration"
          label="Duration"
          type="number"
          variant="standard"
          value={question?.duration ?? ""}
          onChange={(e) => handleQuestionChange("duration", parseInt(e.target.value))}
        />
        <TextField
          id="question-points"
          label="Points"
          type="number"
          variant="standard"
          value={question.points ?? ""}
          onChange={(e) => handleQuestionChange("points", e.target.value)}
        />
      </Grid>
    </>
  )
}

export default QuestionOptions;