import { DialogContentText } from "@mui/material";


const StoreDelete = ({rowData,handleCloseDialog}) => {


  
    return (
        <>
            <DialogContentText>
                Do you want to delete this product ID: {rowData.id}
            </DialogContentText>
        </>
 
      );
}
 
export default StoreDelete;