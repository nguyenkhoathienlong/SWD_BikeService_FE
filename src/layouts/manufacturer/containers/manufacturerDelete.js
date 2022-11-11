import { DialogContentText } from "@mui/material";


const ManufacturerDelete = ({rowData,handleCloseDialog}) => {


  
    return (
        <>
            <DialogContentText>
                Do you want to delete this manufacturer ID: {rowData.id}
            </DialogContentText>
        </>
 
      );
}
 
export default ManufacturerDelete;