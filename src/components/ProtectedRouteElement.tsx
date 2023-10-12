import { useEffect} from "react";
import { useDispatch, useSelector } from "../services/types/index";
import { Navigate, useLocation } from "react-router-dom";
import { getUserData} from "../services/actions/userActions";
import { FC} from "react";

interface IProtectedRouteElement {
  
  onlyUnAuth?: boolean;
  element: JSX.Element;
  
}
export const ProtectedRouteElement: FC<IProtectedRouteElement> = ({ onlyUnAuth = false, element }) => {

  const isAuthChecked = useSelector((state) => state.user.isAuth);
  
  
  const location = useLocation();
  const dispatch = useDispatch()
  
  
  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])
  
  
  if (onlyUnAuth && isAuthChecked) {
    const { from } = location.state || { from: { pathname: "/" } }
    return <Navigate to={from}/>
  }
    if (!onlyUnAuth && !isAuthChecked && !localStorage.getItem('accessToken')) {
      return <Navigate to="/login"  state={{ from: location }} />
    }
    
  return element;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth: FC<IProtectedRouteElement> = ({ element }) => (
  <ProtectedRouteElement onlyUnAuth={true} element={element} />
);