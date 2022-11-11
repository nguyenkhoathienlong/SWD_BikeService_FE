import { useMaterialUIController } from "context";
import { Route, Navigate} from "react-router-dom";
import _ from 'lodash'
import {UUID} from '../../layouts/authentication/sign-in/uuid.config'

const ProtectedRoute = ({children,redirectTo} ) => {
  const [controller] = useMaterialUIController()
  const { login } = controller;
  const cacheUser = localStorage.getItem('UID')
  return (login.isLogin || _.includes(Object.values(UUID), cacheUser)) 
          ? children 
          : <Navigate to={redirectTo}/>  
};

export default ProtectedRoute;
