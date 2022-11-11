import {
  FormControl,
  TextField,
  DialogTitle,
  DialogContentText,
  Autocomplete,
  RadioGroup,
  FormLabel,
  Radio,
  FormControlLabel,
  Box,
} from "@mui/material";


const ServiceCreateEdit = ({ type,rowData, handleChange, categories, manufacturers, stores }) => {

  return (
    <div>
      <DialogTitle>{type=== 'add' ? "Create" : "Edit"} new product or service</DialogTitle>

      <DialogContentText>
        To create roduct or service, please enter fully all of this content here. We will send updates
        occasionally.
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
          name="price"
          label="Price"
          variant="outlined"
          onChange={(e) => handleChange("price", e.target.value)}
          fullWidth
          value={rowData.price}
          required
        />
        <TextField
          name="quantity"
          label="Quantity"
          variant="outlined"
          onChange={(e) => handleChange("quantity", e.target.value)}
          fullWidth
          value={rowData.quantity}
          required
        />
        <Autocomplete
          autoComplete
          loading
          autoSelect
          filterSelectedOptions
          options={manufacturers}
          onChange={(e, value) => handleChange("manufacturer", value)}
          disableClearable={true}
          getOptionLabel={(option) => {
            return option.name || ''
          }}
          renderOption={(props, option) => {
            return (
              <Box component="li" {...props} key={option.id}>
                {option.name}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField {...params} label="Manufacturers" name="manufacturers" variant="outlined" />
          )}
        />
        <Autocomplete
          autoComplete
          autoSelect
          loading
          filterSelectedOptions
          options={categories}
          onChange={(e, value) => handleChange("category", value)}
          disableClearable={true}
          getOptionLabel={(option) => {
            return option.name || ''
          }}
          renderOption={(props, option) => {
            return (
              <Box component="li" {...props} key={option.id}>
                {option.name}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField {...params} label="Categories" name="categories" variant="outlined" />
          )}
        />
        <Autocomplete
          autoComplete
          autoSelect
          loading
          filterSelectedOptions
          options={stores}
          onChange={(e, value) => handleChange("store", value)}
          disableClearable={true}
          getOptionLabel={(option) => {
            return option.name || ''
          }}
          renderOption={(props, option) => {
            return (
              <Box component="li" {...props} key={option.id}>
                {option.name}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField {...params} label="Stores" name="stores" variant="outlined" />
          )}
        />
        <RadioGroup
          defaultValue="service"
          id="demo-row-radio-buttons-group-label"
          name="radio-buttons-group"
          sx={{
            textAlign: "left",
            marginTop:'5px'
          }}
          onChange={(e) => handleChange('isService',e.target.value) }
          
        >
          <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
          <FormControlLabel value="isService" control={<Radio />} label="Type Service"/>
        </RadioGroup>
        {/* <FormControlLabel value="isActive" control={<Radio />} label="Type Product"/> */}
      </FormControl>
    </div>
  );
};

export default ServiceCreateEdit;
