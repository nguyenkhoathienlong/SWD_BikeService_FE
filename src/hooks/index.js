import { setError, setLoading, useMaterialUIController } from "context";

const EventFeature = () => {
  const [controller, dispatch] = useMaterialUIController();

  const {
    isLoading,
    isError 
  } = controller;


  function doLoading(loading) {
    setLoading(dispatch, loading);
  }

  function doError ({ error, ...rest }){
    //Rest must have to be CODE and MESSAGE
    setError(dispatch, { ...isError, error: error, ...rest });
  };

  return {
    doLoading,  /** Boolean TRUE or FALSE */
    doError,    /** Object with { error:boolean (Required), code: Number, message: String } */
  };
};

export default EventFeature;
