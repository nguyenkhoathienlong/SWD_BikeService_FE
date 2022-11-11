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
import { useEffect, useState } from "react";
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
import serviceTable from "layouts/service/containers/serviceTableGet";

import ServiceCreateEdit from "./containers/serviceCreateEdit";
import ServiceDelete from "./containers/serviceDelete";
import Api from "api/api";
import EventFeature from "hooks";
/*
  =========================================================
  * Define Init UI 
        ** Update: Change 2 Button into Component to reduce render 
  =========================================================
  */
const Actions = ({ row, handleOpenEditDialog, handleOpenDeleteDialog }) => {
  return (
    <MDBox>
      <Button startIcon={<EditIcon />} onClick={(e) => handleOpenEditDialog(e)(row)} />
      <Button startIcon={<DeleteIcon />} onClick={(e) => handleOpenDeleteDialog(e)(row)} />
    </MDBox>
  );
};

const baseData = {
  name: "",
  price: 0,
  quantity: 0,
  manufacturer: {name:''},
  category: {name:''},
  store:{name:''},
  isService:0,
  isActive:1
};



function Service() {
  /**
  =========================================================
  * Define Variable and State
  =========================================================
  */

  const [dialog, setDialog] = useState({ open: false, type: "", rowData: "" });
  const { columns, 
          rows, 
          categories, 
          manufacturers, 
          stores 
        } = serviceTable();

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
  const validateSubmit = () => {
    const { rowData } = dialog;
    
    return (
      _.isEmpty(rowData.name) ||
      isNaN(rowData.price) ||
      isNaN(rowData.quantity) ||
      !_.isObject(rowData.manufacturer) ||
      !_.isObject(rowData.category) ||
      !_.isObject(rowData.store) ||
      isNaN(rowData.isActive) ||
      isNaN(rowData.isService) 
    );
  };

  /*
  =========================================================
  *  Handle changing Input and Submit Function:
        + Event for TextField
        + Value and Name for AutoComplete
  =========================================================
  */
  const handleChange = (key, value) => {
      setDialog((prev) => {
        return {
          ...prev,
          rowData: {
            ...prev.rowData,
            [key]:
                (key===value && +1) ||
                (_.includes(["price", "quantity"], key) ? +value : value) 
          },
        };
      });
  };


  const handleSubmit = async () => {
    const { type, rowData } = dialog;
    let api;
    doLoading(true)
    try {
      (type === "add" && (api = await Api.CreateProduct(rowData))) ||
      (type === "edit" && (api = await Api.EditProduct(rowData))) ||
      (type === "delete" && (api = await Api.DeleteProduct(rowData)));
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
        confirmDisable={dialog.type === "delete" ? false : validateSubmit()}
        handleSubmit={handleSubmit}
        handleCloseDialog={handleCloseDialog}
      >
        {(dialog.type === "add" || dialog.type === "edit") && (
          <ServiceCreateEdit
            type={dialog.type}
            rowData={dialog.rowData}
            handleChange={handleChange}
            categories={categories}
            manufacturers={manufacturers}
            stores={stores}
          />
        )}
        {dialog.type === "delete" && <ServiceDelete rowData={dialog.rowData} />}
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
                  Service
                </MDTypography>
                <Button variant="contained" color="success" onClick={handleOpenCreateDialog}>
                  Create
                </Button>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns,
                    rows: _.map([...rows] || [], (row) => (
                      {
                      ...row,
                      Manufacturer:_.find(manufacturers|| [] , data=> data.id === row.manufacturerId )?.name,
                      actions: (
                        <Actions
                          row={row}
                          handleOpenEditDialog={handleOpenEditDialog}
                          handleOpenDeleteDialog={handleOpenDeleteDialog}
                        />
                      ),
                    })),
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

export default Service;
