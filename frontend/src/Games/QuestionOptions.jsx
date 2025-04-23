
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
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
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
        <TextField
          label="Duration"
          type="number"
          variant="standard"
          value={question?.duration ?? ""}
          onChange={(e) => handleQuestionChange("duration", parseInt(e.target.value))}
        />
        <TextField
          label="Points"
          type="number"
          variant="standard"
          value={question.points ?? ""}
          onChange={(e) => handleQuestionChange("points", parseInt(e.target.value))}
        />
      </Grid>
    </>
  )
}

export default QuestionOptions;