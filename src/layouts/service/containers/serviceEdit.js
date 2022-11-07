import {
  FormControl,
  TextField,
  Button,
  DialogTitle,
  DialogContentText,
  Typography,
} from "@mui/material";
import { useState } from "react";

const ServiceEdit = ({ rowData, handleChange,handleCloseDialog }) => {


  const [err, setErr] = useState(false);
  function handleEdit() {
    fetch(`https://nmrp3a0bjc.execute-api.us-east-1.amazonaws.com/Prod/api/Product/${rowData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rowData),
    }).then((res) => {
      if (res !== 200) {
        setErr(true);
      } else {
        handleCloseDialog()
        //window.location.reload();
      }
    });
  }


  return (
    <div style={{ width: "500px" }}>
      <DialogContentText>Edit this rowData.....</DialogContentText>
      {err && (
        <Typography sx={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
          Something went wrong
        </Typography>
      )}
      <FormControl fullWidth>
        <TextField
          name="name"
          label="Name"
          variant="standard"
          onChange={(e) => handleChange(e)}
          fullWidth
          value={rowData.name}
        />
        <TextField
          name="price"
          label="Price"
          variant="standard"
          type="number"
          onChange={(e) => handleChange(e)}
          fullWidth
          value={rowData.price}
        />
        <TextField
          name="quantity"
          label="Quantity"
          variant="standard"
          type="number"
          onChange={(e) => handleChange(e)}
          fullWidth
          value={rowData.quantity}
        />
        <TextField
          name="manufacturerId"
          label="Manufacturer Id"
          variant="standard"
          type="number"
          onChange={(e) => handleChange(e)}
          fullWidth
          value={rowData.manufacturerId}
        />
        <TextField
          name="categoryId"
          label="Category Id"
          variant="standard"
          type="number"
          onChange={(e) => handleChange(e)}
          fullWidth
          value={rowData.categoryId}
        />
        <TextField
          name="storeId"
          label="Store Id"
          variant="standard"
          onChange={(e) => handleChange(e)}
          fullWidth
          value={rowData.storeId}
        />
        <Button onClick={handleEdit}>Edit</Button>
      </FormControl>
    </div>
  );
};

export default ServiceEdit;
