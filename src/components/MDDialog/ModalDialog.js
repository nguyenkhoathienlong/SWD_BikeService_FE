import { Dialog, Button} from "@mui/material";
import { Typography } from "antd";
import MDBox from "components/MDBox";

import _ from "lodash";

const MDModalDialog = (
    {
        open,
        handleCloseDialog,
        confirmDisable,
        handleSumit
    },
    children
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
                        onClick={handleSumit}
                        variant="contained"
                        disabled={confirmDisable}
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
 
export default MDModalDialog;