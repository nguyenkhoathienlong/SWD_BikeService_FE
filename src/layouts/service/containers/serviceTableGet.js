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
import Api from "api/api";
import ErrorHandler from "../components/ErrorHandler";



export default function ServiceTable() {

  const [products, setProducts] = useState([]);

  useEffect( ()=>{
    async function getProducts()
    {
      const data = await Api.getAllProducts()
      if(data)
      {
        setProducts(data)
      }
    }
    getProducts()

  },[])


  return {
    columns: [
      { 
        Header: "Name service", 
        accessor: "name",  
        align: "left"
      },
      { Header: "Price", accessor: "price", align: "left" },
      { Header: "Quantity", accessor: "quantity", align: "center" },
      { Header: "Manufacturer", accessor: "Manufacturer", align: "center" },
      { Header: "Actions", accessor: "actions", align: "center" },
    ], 

    rows: [...products]
  };
}
