
// Material Dashboard 2 React components
import { useState } from "react";
import { useEffect } from "react";
import Api from "api/api";
import _ from "lodash";
import EventFeature from "hooks";
export default function ServiceTable() {
  /**
  =========================================================
  * Define Variable and State
  =========================================================
  */
  const [services, setServices] = useState([]);
  const { doLoading, doError } = EventFeature() 
 
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
          stores:  await Api.getAllStores(),
        },
      ]);
      let check = _.every(data,(item) =>
                                  _.isArray(item.products) ||
                                  _.isArray(item.categories) ||
                                  _.isArray(item.manufacturers) ||
                                  _.isArray(item.stores)
                          );
      if (check) {
        doLoading(false)
        setServices(data);
        
      } else {
        doError({error:true,message:'Wrong Type Of Data'})
        doLoading(false)
      }
    } catch (err) {
      doError({ ...err, error: true })
      doLoading(false)
    }
  }

  useEffect(() => {
    doLoading(true)
    getData();

    /**
     * This API call above is a ASYNCHRONOUS FUNCTION
     * If all the tasks have not been completed yet
     * It would cause memory leak
     * We need to have a clean up function
     * We don't have function to stop calling API, so we set the SERVICE STATE again for easy purpose
     */
    return () => setServices([]);
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
    rows: _.find([...services], ({ products }) => products)?.products || [],
    categories: _.find([...services], ({ categories }) => categories)?.categories || [],
    manufacturers: _.find([...services], ({ manufacturers }) => manufacturers)?.manufacturers || [],
    stores: _.find([...services], ({ stores }) => stores)?.stores || [],
  };
}
