import MDTypography from "components/MDTypography";
import { Snackbar,Alert } from "@mui/material";
import { setError ,useMaterialUIController } from "context";
import { useEffect, useRef } from "react";

const MDError = ({error, code, message}) => {
    const [controller, dispatch] = useMaterialUIController();
    const timer = useRef();
    const {
        isError,
      } = controller;

    useEffect(() => {
        if (error) {
          timer.current = window.setTimeout(() => {
            setError(dispatch, { ...isError, error: false });
          }, 6000);
        }
        return () => clearInterval(timer.current)
        
      },[]);

    return (
        <Snackbar 
            open={error} 
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
            <Alert 
                severity="error"
                sx={{ width: '100%' }}>
                <MDTypography>
                    {message}
                </MDTypography>
            </Alert>
        </Snackbar>
    )

      
}
 
export default MDError;