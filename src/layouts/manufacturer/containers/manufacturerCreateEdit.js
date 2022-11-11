import {
  FormControl,
  TextField,
  DialogTitle,
  DialogContentText

} from "@mui/material";



const ManufacturerCreateEdit = ({ 
    rowData, 
    handleChange
    
  }) => {

  
  return (
    <div>
      <DialogTitle>Create new manufacturer</DialogTitle>

      <DialogContentText>
        "To create manufacturer, please enter fully all of this content here. We will send updates
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
        
      </FormControl>
    </div>
  );
};

export default ManufacturerCreateEdit;
