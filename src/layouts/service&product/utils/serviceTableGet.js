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




export default function ServiceTable() {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    axios(`https://nmrp3a0bjc.execute-api.us-east-1.amazonaws.com/Prod/api/Product/get-all-product`,{
      method:'GET',
      mode: 'no-cors',
    })
    .then( ({data}) => setProducts(data))
    .catch(err=>console.log(err))
  
  },[])


  return {
    columns: [
      { 
        Header: "Name product/service", 
        accessor: "name",  
        align: "left"
      },
      { Header: "Price", accessor: "price", align: "left" },
      { Header: "Quantity", accessor: "quantity", align: "center" },
      { Header: "Manufacturer", accessor: "manufacturerId", align: "center" },
      { Header: "Actions", accessor: "actions", align: "center" },
    ], 

    rows: [...products]
  };
}
