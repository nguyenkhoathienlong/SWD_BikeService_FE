/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { actions } from "react-table";
import { Edit } from "@mui/icons-material";
import MDTypography from "components/MDTypography";
import ModeIcon from '@mui/icons-material/Mode';

export default function ServiceTable() {
  const [rows,setRows] = useState([]);
  useEffect(()=>{
    // sua lai api
    axios(`https://nmrp3a0bjc.execute-api.us-east-1.amazonaws.com/Prod/api/Product/get-all-product`,{
      method:'GET',
      mode: 'no-cors',
    }).then(res=>{
      console.log(res)
      return res.json()
    }
     )
    .then(data=>setRows( (prev) => [...prev,data]  ))
    .catch(err=>console.log(err))
  
  },[])

  return {
    columns: [
      { Header: "Name service", accessor: "name", width: "45%", align: "left" },
      { Header: "Price", accessor: "price", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows:[
      ...rows,
      {actions : "Edit"},
      // {
      //   name: "Nghi",
      //   price: "10",
      //   status: true,
      //   action: (
      //     <>
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       <ModeIcon/>
      //     </MDTypography>
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //     Delete
      //   </MDTypography>
      // </>
      //   ),
      // },
      

    ]
    

  };
}
