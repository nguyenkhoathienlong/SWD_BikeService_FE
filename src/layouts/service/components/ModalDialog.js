import { Dialog, Button} from "@mui/material";
import { Typography } from "antd";
import MDBox from "components/MDBox";

import _ from "lodash";

import ServiceCreate from "../containers/serviceCreate";
import ServiceDelete from "../containers/serviceDelete";
import ServiceEdit from "../containers/serviceEdit";

const ModalDialog = (
    {
        dialog: {
            open,
            type,
            rowData
        },
        handleCloseDialog,
        setDialog,
        confirmDisable
    }) => {
    
    function handleCreate() {
        
    }

    const handleChange = (e,value,name) =>
        setDialog((prev) => {
            return {
                ...prev,
                rowData: {
                        ...prev.rowData,
                        [name]: _.includes(['manufacturerId','categoryId','storeId'],name) ? +value.id : value.id,
                        [e.target.name]: e.target.type === "number" ? +e.target.value : e.target.value,
                    }  
            }
        })
  
    const dialogType = () =>
    {
        switch(type)
        {
         case 'create':
            return <ServiceCreate rowData={rowData} handleChange={handleChange} handleCloseDialog={handleCloseDialog}/>
         case 'edit':
            return <ServiceEdit rowData={rowData} handleChange={handleChange} handleCloseDialog={handleCloseDialog}/>
         case 'delete':
            return <ServiceDelete rowData={rowData} handleCloseDialog={handleCloseDialog}/>
         default:
            return (
                <div>Loading...</div>
             )
        }
    }

    return (
        <Dialog 
            open={open} 
            sx={{
                textAlign:'center',
            }}
            >
                {dialogType()}
                <MDBox
                    mt={3}
                    sx={{display:'flex',justifyContent:'left'}}
                >
                    <Button 
                        onClick={handleCreate}
                        variant="contained"
                    >
                        <Typography>
                            Add
                        </Typography>
                    </Button>
                    <Button 
                        onClick={handleCloseDialog}
                        variant="contained"
                    >
                        <Typography>
                            Delete
                        </Typography>
                    </Button>
                </MDBox>
            
        </Dialog>
      );
}
 
export default ModalDialog;