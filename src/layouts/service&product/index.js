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
import { useState } from "react";
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
import serviceTable from "layouts/service/utils/serviceTableGet";
import ModalDialog from "./components/ModalDialog";

import ServiceCreateEdit from "./containers/serviceCreateEdit";
import ServiceDelete from "./containers/serviceDelete";
import Api from "api/api";

function Service() {

  /**
  =========================================================
  * Define Variable and State
  =========================================================
  */
  const baseData = {
    name: "",
    price: 0,
    quantity: 0,
    manufacturerId: 0,
    categoryId: 0,
    storeId: "",
  };
  const [dialog, setDialog] = useState({ open: false, type: "", rowData: "" });
  const { 
    columns, 
    rows,
    categories,
    manufacturers,
    stores
  } = serviceTable();

  /*
  =========================================================
  * Define Init UI
  =========================================================
  */
  const Actions = (row) => {
    return (
      <MDBox>
        <Button startIcon={<EditIcon />} onClick={(e) => handleOpenEditDialog(e)(row)} />
        <Button startIcon={<DeleteIcon />} onClick={(e) => handleOpenDeleteDialog(e)(row)} />
      </MDBox>
    );
  };

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
        isNaN(rowData.price) ||
        isNaN(rowData.quantity) ||
        isNaN(rowData.manufacturerId) ||
        isNaN(rowData.categoryId) || 
        isNaN(rowData.storeId) ||
      _.isEmpty(rowData.category) 
      )

  }

  /*
  =========================================================
  *  Handle changing Input and Submit Function:
        + Event for TextField
        + Value and Name for AutoComplete
  =========================================================
  */
  const handleChange = (e, value, name) => 
    setDialog((prev) => {
      return {
        ...prev,
        rowData: {
          ...prev.rowData,
          [name]: _.includes(["manufacturerId", "categoryId", "storeId"], name) ? +value?.id: value?.id,
          [e.target.name]: e.target.type === "number" ? +e.target.value : e.target.value,
        },
      };
    });

  const handleSubmit = async () => 
  {
    const { 
      type, 
      rowData 
    } = dialog;

    (type === 'add' && await Api.CreateProducts(rowData)) || 
    (type === 'edit' && await Api.EditProduct(rowData)) ||
    (type === 'delete' && await Api.DeleteProduct(rowData))
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
          <ServiceCreateEdit 
            rowData={dialog.rowData}
            handleChange={handleChange}    
            categories={categories}
            manufacturers={manufacturers}
            stores={stores}
          />
        ))
        }
        {
          (dialog.type === "delete" && (
            <ServiceDelete 
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
                  Service & Product
                </MDTypography>
                <Button variant="contained" color="success" onClick={handleOpenCreateDialog}>
                  Create
                </Button>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns,
                    rows: _.map([...rows] || [], (row) => ({ ...row, actions: Actions(row) })),
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
