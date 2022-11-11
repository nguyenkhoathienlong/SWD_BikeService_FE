import { Dialog, Button} from "@mui/material";
import { Typography } from "antd";
import MDBox from "components/MDBox";


const MDModalDialog = (
    {
        // Props:
        open,
        handleCloseDialog,
        confirmDisable,
        handleSubmit,
        children
    }
    ) => {
   
    return (
        <Dialog 
            open={open} 
            sx={{
                textAlign:'center',
            }}
            >
                {children}
                <MDBox
                    mt={3}
                    sx={{display:'flex',justifyContent:'left'}}
                >
                    <Button 
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={confirmDisable}
                    >
                        <Typography>
                            Submit
                        </Typography>
                    </Button>
                    <Button 
                        onClick={handleCloseDialog}
                        variant="contained"
                    >
                        <Typography>
                            Cancel
                        </Typography>
                    </Button>
                </MDBox>
            
        </Dialog>
      );
}
 
export default MDModalDialog;