import { DialogContentText } from "@mui/material";


const ServiceDelete = ({rowData,handleCloseDialog}) => {


  
    return (
        <>
            <DialogContentText>
                Do you want to delete this product ID: {rowData.id}
            </DialogContentText>
        </>
 
      );
}
 
export default ServiceDelete;