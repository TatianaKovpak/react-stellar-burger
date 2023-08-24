import AppHeader from "../AppHeader/AppHeader";
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import { HomePage } from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password";
import { ProfilePage } from "../../pages/profile";
import { NotFound404 } from "../../pages/404";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";

import { OnlyAuth, OnlyUnAuth } from "../ProtectedRouteElement";
import { useDispatch, useSelector } from "react-redux";
import { IngredientDetailsPage } from "../../pages/ingredient-details";

function App() {
  const modal = useSelector(state => state.modal)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state && location.state.background; 

  function closePopup (e) {
    navigate('/')
    dispatch({
        type: 'CLOSE_MODAL'
    });
}

  return (
  <>

  
  <AppHeader/>
    <Routes location={background || location}>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<OnlyUnAuth element={<LoginPage/>}/> }/>
      <Route path="/register" element={<OnlyUnAuth element={<RegisterPage/>} />}/>
      <Route path="/forgot-password" element={<OnlyUnAuth element={<ForgotPasswordPage/>}/> }/>
      <Route path="/reset-password" element={<OnlyUnAuth element={<ResetPasswordPage/>} />}/>
      <Route path="/ingredient/:id" element={<IngredientDetailsPage/>}/>
      <Route path="/profile" element={<OnlyAuth element = {<ProfilePage/>}  />}/>
      <Route path="*" element={<NotFound404/>} />
    </Routes>
    
    {background && (
      <Routes>
        <Route path="/ingredient/:id" element={ 
          <Modal onClose= {() => closePopup()} isOpened={modal.isIngredient}>
              {modal.isIngredient && <IngredientDetails  />}
          </Modal>   }>

        </Route>
      </Routes>
    )}
    
 
  
  </>
  );
}

export default App;
