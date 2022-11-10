
// Material Dashboard 2 React components
import { useState } from "react";
import { useEffect } from "react";
import Api from "api/api";
import _ from "lodash";
import EventFeature from "hooks";



function Services() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [stores, setStores] = useState([]);
  
 
  function serviceCreate(products,categories,manufacturers,stores) {
    setProducts(products) 
    setCategories(categories) 
    setManufacturers(manufacturers)
    setStores(stores) 
  }
 
  return {
    products,
    categories,
    manufacturers,
    stores,
    serviceCreate
  }
}

export default function ServiceTable() {
  /**
  =========================================================
  * Define Variable and State
  =========================================================
  */
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [stores, setStores] = useState([]);
  const { doLoading, doError } = EventFeature() 
 
  /**
  =========================================================
  * API CALL for INIT SERVICE:
  =========================================================
  */
  useEffect(() => {
    ( async () => {
      try {
        doLoading(true)
        const [
          products,
          categories,
          manufacturers,
          stores
        ] = await Promise.all([
            Api.getAllProducts(),
            Api.getAllCategories(),
            Api.getAllManufacturers(),
            Api.getAllStores(),
          ]);
        if (
          _.isArray(products) ||
          _.isArray(categories) ||
          _.isArray(manufacturers) ||
          _.isArray(stores)
        ) {
          doLoading(false)
          setProducts(products) 
          setCategories(categories) 
          setManufacturers(manufacturers)
          setStores(stores) 
          
        } else {
          doError({error:true,message:'Wrong Type Of Data'})
          doLoading(false)
        }
      } catch (err) {
        doError({ ...err, error: true })
        doLoading(false)
      }
    })()

    /**
     * This API call above is a ASYNCHRONOUS FUNCTION
     * If all the tasks have not been completed yet
     * It would cause memory leak
     * We need to have a clean up function
     * We don't have function to stop calling API, so we set the SERVICE STATE again for easy purpose
     */
    return () => []
    //https://bobbyhadz.com/blog/react-hook-useeffect-has-missing-dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('Nghi')
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
    rows: products || [],
    categories: categories || [],
    manufacturers: manufacturers || [],
    stores: stores || [],
  };
}
