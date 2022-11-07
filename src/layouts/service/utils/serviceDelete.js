import { FormControl, TextField,Button,DialogTitle, DialogContentText, Typography } from "@mui/material";
import { useState } from "react";

const ServiceDelete = ({rowData,handleCloseDialog}) => {

    const [err, setErr] = useState(false);
    const handleDelete = () =>
    {
        fetch(`https://nmrp3a0bjc.execute-api.us-east-1.amazonaws.com/Prod/api/Product/${rowData.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
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
        <>
              <DialogContentText>
                Do you want to delete this product ID: {rowData.id}
            </DialogContentText>
            {err && (
                <Typography sx={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
                Something went wrong
                </Typography>
            )}
            <Button onClick={handleDelete}>Delete</Button>
        </>
 
      );
}
 
export default ServiceDelete;