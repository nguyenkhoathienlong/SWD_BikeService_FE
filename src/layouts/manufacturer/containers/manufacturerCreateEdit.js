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



const ServiceCreateEdit = ({ 
    rowData, 
    handleChange,
    categories,
    manufacturers,
    stores 
  }) => {

  
  return (
    <div>
      <DialogTitle>Create new product or service</DialogTitle>

      <DialogContentText>
        "To create roduct or service, please enter fully all of this content here. We will send updates
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
          onChange={(e, value) => handleChange("manufacturerId",value)}
          disableClearable={true}
          getOptionLabel={(option) => {
            return option.name;
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
          onChange={(e, value) => handleChange("categoryId",value)}
          disableClearable={true}
          getOptionLabel={(option) => {
            return option.name;
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
          onChange={(e, value) => handleChange("storeId",value)}
          disableClearable={true}
          getOptionLabel={(option) => {
            return option.name;
          }}
          renderInput={(params) => (
            <TextField {...params} label="Stores" name="stores" variant="outlined" />
          )}
        />
        <RadioGroup
          defaultValue="service"
          name="radio-buttons-group"
          sx={{
            textAlign: "left",
          }}
        >
          <FormControlLabel value="service" control={<Radio />} label="Type Service" />
          <FormControlLabel value="product" control={<Radio />} label="Type Product" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default ServiceCreateEdit;
