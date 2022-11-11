import { DialogContentText } from "@mui/material";


const CategoryDelete = ({rowData,handleCloseDialog}) => {


  
    return (
        <>
            <DialogContentText>
                Do you want to delete this Category ID: {rowData.id}
            </DialogContentText>
        </>
 
      );
}
 
export default CategoryDelete;