import { useMaterialUIController, setError } from "context";
import MDBox from "components/MDBox";
import MDCircleLoading from "components/MDCircleLoading";
import MDError from "components/MDError";

const Feature = () => {
  const [controller] = useMaterialUIController();
  const {
    isLoading,
    isError: { error, code, message },
  } = controller;


  return (
    <MDBox>
      {isLoading && <MDCircleLoading />}
      {error && <MDError error={error} code={code} message={message} />}
    </MDBox>
  );
};

export default Feature;
