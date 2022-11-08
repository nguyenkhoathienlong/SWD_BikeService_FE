import MDTypography from "components/MDTypography";
import { Snackbar, Alert } from "@mui/material";
import { setError, useMaterialUIController } from "context";
import { useEffect, useRef } from "react";

const MDError = ({ error, code, message }) => {
  const [controller, dispatch] = useMaterialUIController();
  const timer = useRef();
  const { isError } = controller;

  useEffect(() => {
    if (error) {
      timer.current = window.setTimeout(() => {
        setError(dispatch, { ...isError, error: false });
      }, 6000);
    }
    return () => clearInterval(timer.current);
    //https://bobbyhadz.com/blog/react-hook-useeffect-has-missing-dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Snackbar open={error} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
      <Alert severity="error" sx={{ width: "100%" }}>
        <MDTypography>{message}</MDTypography>
      </Alert>
    </Snackbar>
  );
};

export default MDError;
