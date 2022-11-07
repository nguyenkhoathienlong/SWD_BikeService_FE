import { Dialog, DialogTitle, DialogContentText } from "@mui/material";

import { useState } from "react";

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
        setDialog
    }) => {
    


    const handleChange = (e) =>
        setDialog((prev) => {
            return {
                ...prev,
                rowData: {
                        ...prev.rowData,
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
            onClose={handleCloseDialog }
            
            >
                {dialogType()}
        </Dialog>
      );
}
 
export default ModalDialog;