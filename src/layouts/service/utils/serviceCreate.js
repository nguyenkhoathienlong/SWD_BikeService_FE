import {
  FormControl,
  TextField,
  Button,
  DialogTitle,
  DialogContentText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const ServiceCreate = ({rowData,handleChange}) => {
  
  const [err, setErr] = useState(false);

  function handleCreate() {
    fetch(`https://nmrp3a0bjc.execute-api.us-east-1.amazonaws.com/Prod/api/rowData`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rowData),
    }).then((res) => {
      if (res !== 200) {
        setErr(true);
      } else {
        window.location.reload();
      }
    });
  }
  console.log('Nghi1',rowData)
  return (
    <div style={{width:'500px'}}>
      <DialogTitle>Create rowData</DialogTitle>

      {err ? (
        <Typography sx={{ color: "red", fontWeight: "bold" , textAlign:'center'}}>
          Fail to create new rowData
        </Typography>
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
          variant="standard"
          onChange={(e) => handleChange(e)}
          fullWidth
          required
        />
        <TextField
          name="price"
          label="Price"
          variant="standard"
          type="number"
          onChange={(e) => handleChange(e)}
          fullWidth
          required
        />
        <TextField
          name="quantity"
          label="Quantity"
          variant="standard"
          type="number"
          onChange={(e) => handleChange(e)}
          fullWidth
          required
        />
        <TextField
          name="manufacturerId"
          label="Manufacturer Id"
          variant="standard"
          type="number"
          onChange={(e) => handleChange(e)}
          fullWidth
          required
        />
        <TextField
          name="categoryId"
          label="Category Id"
          variant="standard"
          type="number"
          onChange={(e) => handleChange(e)}
          fullWidth
          required
        />
        <TextField
          name="storeId"
          label="Store Id"
          variant="standard"
          onChange={(e) => handleChange(e)}
          fullWidth
          required
        />
        <Button onClick={handleCreate}>Create new rowData</Button>
      </FormControl>
    </div>
  );
};

export default ServiceCreate;
