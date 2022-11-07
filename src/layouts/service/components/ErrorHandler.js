import { Typography } from "@mui/material";
import { useState } from "react";

const ErrorHandler = () => {
    const [error, setError] = useState(false)

    function isError()
    {
        setError(true)
    }
    return {
        error,
        isError,
        errMessage: (
            <Typography sx={{ color: "red", fontWeight: "bold" , textAlign:'center'}}>
                Something went wrong
            </Typography>
        )
    }

      
}
 
export default ErrorHandler;