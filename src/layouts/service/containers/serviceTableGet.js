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
import { setLoading, setError ,useMaterialUIController } from "context";
import _ from "lodash";

export default function ServiceTable() {
  /**
  =========================================================
  * Define Variable and State
  =========================================================
  */
  const [products, setProducts] = useState([]);
  const [controller, dispatch] = useMaterialUIController();

  /**
  =========================================================
  * API CALL for INIT SERVICE:
  =========================================================
  */
  async function getData() {
    try {
      const data = await Promise.all([
        {
          products: await Api.getAllProducts(),
        },
        {
          categories: await Api.getAllCategories(),
        },
        {
          manufacturers: await Api.getAllManufacturers(),
        },
        {
          stores: await Api.getAllStores(),
        },
      ]);
      if (data) {
        setProducts(data);
        setLoading(dispatch, false);
      }
    } catch (err) {
      setError(dispatch, {...err, error:true })
      setLoading(dispatch, false);
    }
  }

  useEffect(() => {
    setLoading(dispatch, true);
    getData();

    /**
     * This API call above is a ASYNCHRONOUS FUNCTION
     * If all the tasks have not been completed yet
     * It would cause memory leak
     * We need to have a clean up function
     * We don't have function to stop calling API, so we set the SERVICE STATE again for easy purpose
     */
    return () => setProducts([]);
    //https://bobbyhadz.com/blog/react-hook-useeffect-has-missing-dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    columns: [
      {
        Header: "Name service",
        accessor: "name",
        align: "left",
      },
      { Header: "Price", accessor: "price", align: "left" },
      { Header: "Quantity", accessor: "quantity", align: "center" },
      { Header: "Manufacturer", accessor: "Manufacturer", align: "center" },
      { Header: "Actions", accessor: "actions", align: "center" },
    ],
    rows: _.find([...products], ({ products }) => products)?.products || [],
    categories: _.find([...products], ({ categories }) => categories)?.categories || [],
    manufacturers: _.find([...products], ({ manufacturers }) => manufacturers)?.manufacturers || [],
    stores: _.find([...products], ({ stores }) => stores)?.stores || [],
  };
}
