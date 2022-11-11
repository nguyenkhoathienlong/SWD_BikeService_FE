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
import { useState,useMemo } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDModalDialog from "../../components/MDDialog/ModalDialog";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import _ from "lodash";

// Utils and Service Component
import StoreTable from "layouts/store/containers/storeTableGet";

import StoreCreateEdit from "./containers/storeCreateEdit";
import ServiceDelete from "./containers/storeDelete";
import Api from "api/api";
import StoreDelete from "./containers/storeDelete";
import EventFeature from "hooks";





  /*
  =========================================================
  * Define Init UI 
        ** Update: Change 2 Button into Component to reduce render 
  =========================================================
  */
  const Actions = ({row,handleOpenEditDialog,handleOpenDeleteDialog}) => {
    return (
      <MDBox>
        <Button startIcon={<EditIcon />} onClick={(e) => handleOpenEditDialog(e)(row)} />
        <Button startIcon={<DeleteIcon />} onClick={(e) => handleOpenDeleteDialog(e)(row)} />
      </MDBox>
    );
  };

  const baseData = {
    name: "",
    phoneNumber:"",
    address:"",
    wardId:0
  };

  const dataArr = Object.keys(baseData)


function Store() {

  /**
  =========================================================
  * Define Variable and State
  =========================================================
  */

  const [dialog, setDialog] = useState({ open: false, type: "", rowData: "" });
  const { 
    columns, 
    rows,
    wards
  } = StoreTable();
  const { doLoading, doError } = EventFeature() 
  /*
  =========================================================
  *  Function for Dialog:
  =========================================================
  */
  const handleOpenCreateDialog = () =>
    setDialog((prev) => ({ ...prev, open: true, type: "add", rowData: baseData }));
  const handleOpenEditDialog = (e) => (row) =>
    setDialog((prev) => ({ ...prev, open: true, type: "edit", rowData: row }));
  const handleOpenDeleteDialog = (e) => (row) =>
    setDialog((prev) => ({ ...prev, open: true, type: "delete", rowData: row }));
  const handleCloseDialog = () =>
    setDialog((prev) => ({ ...prev, open: false, type: "", rowData: "" }));

  
  /*
  =========================================================
  *  Validate Input Field after submit
  =========================================================
  */
  const validateSubmit = () =>
  {
    const { rowData } = dialog;
    return ( 
      _.isEmpty(rowData.name) || 
      _.isEmpty(rowData.phoneNumber) || 
      _.isEmpty(rowData.address) || 
        isNaN(rowData.wardId)
      )

  }

  /*
  =========================================================
  *  Handle changing Input and Subaddressit Function:
        + Event for TextField
        + Value and Name for AutoComplete
  =========================================================
  */
  const handleChange = (key,value) =>
  {
     setDialog((prev) => {
      return {
        ...prev,
        rowData: {
          ...prev.rowData,
          [key]: key === 'wardId' ? +value : value
        },
      };
    }
    );
  }
  const handleSubmit = async () => 
  {
    const { 
      type, 
      rowData 
    } = dialog;

    let api;
    try {
      (type === 'add' && await ( api = Api.CreateStore(rowData))) || 
      (type === 'edit' && await ( api = Api.EditStore(rowData))) ||
      (type === 'delete' && await ( api = Api.DeleteStore(rowData)))

     if(api){
        handleCloseDialog()
        doLoading(false)
        window.location.reload(true);

      }
    } catch(err) {
      doError({ ...err, error: true, message:err.message })
      handleCloseDialog()
      doLoading(false)
    }

  };



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDModalDialog
        open={dialog.open}
        confirmDisable={dialog.type === 'delete' ? false : validateSubmit() }
        handleSubmit={handleSubmit}
        handleCloseDialog={handleCloseDialog}
      >
        {
        ((dialog.type === "add" || dialog.type === "edit") && (
          <StoreCreateEdit 
            type={dialog.rowData}
            rowData={dialog.rowData}
            handleChange={handleChange}   
            wards={wards}
          />
        ))
        }
        {
          (dialog.type === "delete" && (
            <StoreDelete 
              rowData={dialog.rowData}
            />
          ))
        }
      </MDModalDialog>

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <MDTypography variant="h6" color="white">
                  Store
                </MDTypography>
                <Button variant="contained" color="success" onClick={handleOpenCreateDialog}>
                  Create
                </Button>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns,
                    rows: _.map([...rows] || [], (row) => ({ ...row, actions: <Actions row={row} handleOpenEditDialog={handleOpenEditDialog} handleOpenDeleteDialog={handleOpenDeleteDialog} /> })),
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Store;
