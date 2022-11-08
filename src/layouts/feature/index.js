import { useMaterialUIController } from "context";
import MDBox from "components/MDBox";
import MDCircleLoading from "components/MDCircleLoading";


const Feature = () => {
    const [controller] = useMaterialUIController();
    const {
        isLoading,
        isError
    } = controller
    
    return ( 
        <MDBox>
            {
                isLoading && <MDCircleLoading/>
            }
        </MDBox>
     );
}
 
export default Feature;