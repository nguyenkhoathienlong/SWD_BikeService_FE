import { Dialog, DialogTitle, DialogContentText } from "@mui/material";

import { useState } from "react";

import ServiceCreate from "../utils/serviceCreate";
import ServiceDelete from "../utils/serviceDelete";
import ServiceEdit from "../utils/serviceEdit";

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
            console.log(prev)
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
            return <ServiceCreate rowData={rowData} handleChange={handleChange}/>
         case 'edit':
            return <ServiceEdit rowData={rowData} handleChange={handleChange}/>
         case 'delete':
            return <ServiceDelete rowData={rowData} handleChange={handleChange}/>
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