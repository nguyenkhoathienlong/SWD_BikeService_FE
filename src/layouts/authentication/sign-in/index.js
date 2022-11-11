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

import { useState } from "react";

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";


import {auth,provider} from '../../../firebase'
import { signInWithPopup,} from "firebase/auth";
import { setLogin ,useMaterialUIController } from "context";
import EventFeature from "hooks";
import {useNavigate} from 'react-router-dom'
import { UUID } from "./uuid.config";
import _ from 'lodash'

function Basic() {
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialUIController();
  const {
    login
  } = controller;

 const {doError} = EventFeature();

  const signInWithGoogle = async () =>{
    try {
      const signIn = await signInWithPopup(auth,provider)
      if(signIn) {
        if(_.includes(Object.values(UUID), signIn.user.uid)) {
          localStorage.setItem('UID',signIn.user.uid)
          setLogin(dispatch,{...login, isLogin:true,email:signIn.user.email,photoURL:signIn.user.photoURL})
          navigate('/dashboard')
        }
        else {
          doError({error:true,message:'Wrong User Authentication'})
        }
      } else {
        doError({error:true,message:'Some thing went wrong'})
      }
    }
    catch(err) {
      doError({error:true,message:err})
    }
    
    
  }


  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Login With Google
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon 
                  onClick={signInWithGoogle}
                  color="inherit" 
                />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        {/* <MDBox mt={3} mb={1} textAlign="center">
          <MDTypography variant="button" color="text">
            Don't Have Account? <MDTypography sx={{cursor:'pointer'}}>Sign Up</MDTypography>
          </MDTypography>
        </MDBox> */}
      </Card>
    </BasicLayout>
  );
}

export default Basic;
