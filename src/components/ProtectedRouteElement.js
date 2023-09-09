import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getUserData} from "../services/actions/userActions";


export const ProtectedRouteElement = ({ onlyUnAuth = false, element }) => {
  const isAuthChecked = useSelector((state) => state.user.isAuth);
  
  const location = useLocation();
  const dispatch = useDispatch()
 

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])
  
  if (onlyUnAuth && isAuthChecked) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }
  
  if (!onlyUnAuth && !isAuthChecked) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ element }) => (
  <ProtectedRouteElement onlyUnAuth={true} element={element} />
);