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

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Utils and Service Component
import serviceTable from "layouts/service/utils/serviceTableGet";
import ModalDialog from "./components/ModalDialog";


function Service() {
  const [dialog , setDialog] = useState({open:false,type:'', rowData:''})
  const { columns, rows } = serviceTable();

  const handleOpenCreateDialog = () => setDialog((prev)=>({...prev,open:true, type:'create'}))
  const handleOpenEditDialog = (e) => (row) => setDialog((prev)=>({...prev,open:true, type:'edit', rowData:row}))
  const handleOpenDeleteDialog = (e) => (row) => setDialog((prev)=>({...prev,open:true,type:'delete', rowData:row}))

  const handleCloseDialog = () => setDialog( (prev) => ({...prev, open:false, type:'', rowData:''}))

  const Actions = (row) =>  {
    return (
      <MDBox>
        <Button
          startIcon={<EditIcon/>}
          onClick={(e) => handleOpenEditDialog(e)(row)}
        />
        <Button
          startIcon={<DeleteIcon/>}
          onClick={(e) =>  handleOpenDeleteDialog(e)(row)}

        />
      </MDBox>
    )
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ModalDialog
        dialog={dialog}
        handleCloseDialog={handleCloseDialog}
        setDialog={setDialog}
      />
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
                sx={{display:'flex',justifyContent:'space-between'}}
              >
                <MDTypography variant="h6" color="white">
                  Service
                </MDTypography>
                <Button 
                  variant="contained" 
                  color="success"
                  onClick={handleOpenCreateDialog}
                >
                  Create
                </Button>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows:[...rows].map(row => ( {...row, actions: Actions(row) } )) }}
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
