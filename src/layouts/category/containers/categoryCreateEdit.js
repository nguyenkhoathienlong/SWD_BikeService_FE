import {
  FormControl,
  TextField,
  DialogTitle,
  DialogContentText,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";



const CategoryCreateEdit = ({ 
    rowData, 
    handleChange
    
  }) => {

  
  return (
    <div>
      <DialogTitle>Create new category</DialogTitle>

      <DialogContentText>
        "To create category, please enter fully all of this content here. We will send updates
        occasionally."
      </DialogContentText>

      <FormControl fullWidth>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          onChange={(e) => handleChange("name", e.target.value)}
          fullWidth
          value={rowData.name}
          required
        />
        <RadioGroup
          defaultValue="is_actived"
          name="radio-buttons-group"
          sx={{
            textAlign: "left",
          }}
        >
          <FormControlLabel value="is_actived" control={<Radio />} label="Active" />
         
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default CategoryCreateEdit;
