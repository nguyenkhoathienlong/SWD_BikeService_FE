import {
  FormControl,
  TextField,
  Button,
  DialogTitle,
  DialogContentText,
  Autocomplete,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";

import { useEffect, useState } from "react";
import ErrorHandler from "../components/ErrorHandler";

import Api from "api/api";
import _ from "lodash";

const ServiceCreateEdit = ({ rowData, handleChange, handleCloseDialog }) => {

  const [services, setServices] = useState([]);

  const { error, isError, errMessage } = ErrorHandler();

  async function getData() {
    const data = await Promise.all([
      {
        categories: await Api.getAllCategories(),
      },
      {
        manufacturers: await Api.getAllManufacturers(),
      },
      {
        stores: await Api.getAllStores(),
      },
    ]);
    return data;
  }

  useEffect(() => {
    async function callAPI()
    {
      const response = await getData()
      if(response)
      {
        setServices(response)
      }
     
    }
    callAPI()
  }, []);


  return (
    <div style={{ width: "600px" }}>
      <DialogTitle>Create rowData</DialogTitle>

      {error ? (
        errMessage
      ) : (
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
          loading
          autoSelect
          filterSelectedOptions
          options={ _.find(services || [] , ({manufacturers}) => manufacturers )?.manufacturers || []}
          onChange={(e, value) => handleChange(e, value, "manufacturerId")}
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
          options={_.find(services || [], ({categories}) => categories )?.categories || []}
          onChange={(e, value) => handleChange(e, value, "categoryId")}
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
          options={_.find(services || [], ({stores}) => stores )?.stores || []}
          onChange={(e, value) => handleChange(e, value, "storeId")}
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
          <FormControlLabel value="product" control={<Radio />} l label="Type Product" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default ServiceCreateEdit;
