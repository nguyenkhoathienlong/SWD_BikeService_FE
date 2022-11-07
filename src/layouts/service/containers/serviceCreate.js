import {
  FormControl,
  TextField,
  Button,
  DialogTitle,
  DialogContentText,
  Autocomplete,
  RadioGroup,
  Radio,
  FormControlLabel
} from "@mui/material";

import { useEffect, useState  } from "react";
import ErrorHandler from "../components/ErrorHandler";

import Api from "api/api";

const ServiceCreate = ({rowData,handleChange,handleCloseDialog }) => {

  const [ categories, setCategories] = useState([])
  const [ manufacturers, setManufacturers ] = useState([])
  const [ stores, setStores ] = useState([])
  const {error, isError, errMessage } = ErrorHandler();

  useEffect(()=>{

    async function getCategories()
    {
      const data = await Api.getAllCategories()
      if(data) setCategories(data)
      
    }
    async function getManufacturers()
    {
      const data = await Api.getAllManufacturers()
      if(data) setManufacturers(data)
    }
    async function getStores()
    {
      const data = await Api.getAllStores()
      if(data) setStores(data)
    }

    getCategories()
    getManufacturers()
    getStores()

  },[])




  return (
    <div style={{width:'600px'}}>
      <DialogTitle>Create rowData</DialogTitle>

      {
      error
      ? (errMessage) 
      : (
        <DialogContentText>
          "To create rowData, please enter fully all of this content here. We will send updates
          occasionally."
        </DialogContentText>
      )}
      <FormControl fullWidth>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          onChange={(e) => handleChange(e)}
          fullWidth
          value={rowData.name}
          required
        />
        <TextField
          name="price"
          label="Price"
          variant="outlined"
          type="number"
          onChange={(e) => handleChange(e)}
          fullWidth
          value={rowData.price}
          required
        />
        <TextField
          name="quantity"
          label="Quantity"
          variant="outlined"
          type="number"
          onChange={(e) => handleChange(e)}
          fullWidth
          value={rowData.quantity}
          required
        />
        <Autocomplete
          autoComplete
          autoSelect
          filterSelectedOptions
          options={manufacturers || []}
          onChange={(e,value) => handleChange(e,value,'manufacturerId')}
          disableClearable={true}
          getOptionLabel={(option)=>{
            return option.name
          }}
          renderInput={(params) => (
            <TextField {...params}
              label="Manufacturers"
              name="manufacturers"
              variant="outlined"
            />
          )}
        />
         <Autocomplete
          autoComplete
          autoSelect
          filterSelectedOptions
          options={categories || []}
          onChange={(e,value) => handleChange(e,value,'categoryId')}
          disableClearable={true}
          getOptionLabel={(option)=>{
            return option.name
          }}
          renderInput={(params) => (
            <TextField {...params}
              label="Categories"
              name="categories"
              variant="outlined"
            />
          )}
        />
         <Autocomplete
          autoComplete
          autoSelect
          filterSelectedOptions
          options={stores || []}
          onChange={(e,value) => handleChange(e,value,"storeId")}
          disableClearable={true}
          getOptionLabel={(option)=>{
            return option.name
          }}
          renderInput={(params) => (
            <TextField {...params}
              label="Stores"
              name="store"
              variant="outlined"
            />
          )}
        />
         <RadioGroup
            defaultValue="service"
            name="radio-buttons-group"
            sx={{
              textAlign:'left'
            }}
          >
            <FormControlLabel 
              value="service" 
              control={<Radio />} 
              label="Type Service" />
            <FormControlLabel 
              value="product" 
              control={<Radio />} l
              label="Type Product" />

          </RadioGroup>
      </FormControl>
    </div>
  );
};

export default ServiceCreate;
