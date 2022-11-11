import {
  FormControl,
  TextField,
  DialogTitle,
  DialogContentText,
  Autocomplete,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";



const StoreCreateEdit = ({ 
    rowData, 
    handleChange,
    wards
  }) => {

  
  return (
    <div>
      <DialogTitle>Create new store</DialogTitle>

      <DialogContentText>
        "To create store, please enter fully all of this content here. We will send updates
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
        <TextField
          name="phoneNumber"
          label="Phone"
          variant="outlined"
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
          fullWidth
          value={rowData.phoneNumber}
          required
        />
        <TextField
          name="address"
          label="Address"
          variant="outlined"
          onChange={(e) => handleChange("address", e.target.value)}
          fullWidth
          value={rowData.address}
          required
        />
        <Autocomplete
          autoComplete
          loading
          autoSelect
          filterSelectedOptions
          options={wards}
          onChange={(e, value) => handleChange("ward_id",value)}
          disableClearable={true}
          getOptionLabel={(option) => {
            return option.name;
          }}
          renderInput={(params) => (
            <TextField {...params} label="Ward" name="ward" variant="outlined" />
          )}
        />
      </FormControl>
    </div>
  );
};

export default StoreCreateEdit;
