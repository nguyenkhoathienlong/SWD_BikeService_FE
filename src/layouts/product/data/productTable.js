/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { action } from "react-table";
import { Edit } from "@mui/icons-material";
import MDTypography from "components/MDTypography";
import ModeIcon from "@mui/icons-material/Mode";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductTable() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const [rows, setRows] = useState([]);
  useEffect(() => {
    // sua lai api
    axios(
      `https://nmrp3a0bjc.execute-api.us-east-1.amazonaws.com/Prod/api/Product/get-all-product`,
      {
        method: "GET",
        mode: "no-cors",
      }
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => setRows((prev) => [...prev, data]))
      .catch((err) => console.log(err));
  }, []);

  return {
    columns: [
      { Header: "Name product", accessor: "name", width: "45%", align: "left" },
      { Header: "Model", accessor: "model", align: "left" },
      { Header: "Price", accessor: "price", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: [
      // ...rows,
      // {actions : "Edit"},
      {
        ...rows,

        action: (
          <>
            <MDTypography
              onClick={handleClickOpen}
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              <ModeIcon />
            

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Edit product detail</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="price"
                  label="New price"
                  type="price"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="model"
                  label="New model"
                  type="model"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Submit</Button>
                <Button onClick={handleClose}>Cancel</Button>
              </DialogActions>
            </Dialog>
            </MDTypography>

            <MDTypography
              onClick={handleClickOpen}
              variant="caption"
              color="text"
              fontWeight="medium"
            >
              <DeleteIcon />
              
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Delete product ?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Do you want to delete this product
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Disagree</Button>
                  <Button onClick={handleClose} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
              </MDTypography>
          </>
        ),
      },
    ],
  };
}
