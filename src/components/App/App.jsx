import AppHeader from "../AppHeader/AppHeader";
import { Routes, Route, useLocation, useNavigate, Router} from 'react-router-dom';
import { HomePage } from "../../pages/homePage/home";
import { LoginPage } from "../../pages/loginUserPage/login";
import { RegisterPage } from "../../pages/registerUserPage/register";
import { ForgotPasswordPage } from "../../pages/forgotPasswordPage/forgot-password";
import { ResetPasswordPage } from "../../pages/resetPasswordPage/reset-password";
import { ProfilePage } from "../../pages/profilePage/profile";
import { NotFound404 } from "../../pages/notFoundPage/404";
import { OrderDetailsPage } from "../../pages/orderDetailsPage/orderDetailsPage";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";

import { OnlyAuth, OnlyUnAuth } from "../ProtectedRouteElement";
import { useDispatch, useSelector } from "react-redux";
import { IngredientDetailsPage } from "../../pages/ingredientDetailsPage/ingredient-details";
import { FeedPage } from "../../pages/feedPage/feed";
import Order from "../Order/Order";

function App() {
  const modal = useSelector(state => state.modal)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state && location.state.background; 
  

  function closePopup (e) {
   navigate(-1)
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
      <Route path = '/reset-password' element={<OnlyUnAuth element={<ResetPasswordPage/>} />}/>
      <Route path="/ingredient/:id" element={<IngredientDetailsPage/>}/>
      <Route path="/profile" element={<OnlyAuth element = {<ProfilePage/>}/>}/>
      <Route path="/profile/orders" element={<OnlyAuth element={<ProfilePage/>}/>}/>
      <Route path="/profile/orders/:number" element={<OrderDetailsPage/>}/>
     
      <Route path="/feed" element={<FeedPage/>}/>
      <Route path="/feed/:number"element = {<OrderDetailsPage/>}/>
      <Route path="*" element={<NotFound404/>} />
    </Routes>
    
    {background && (
      <Routes>
        <Route path="/ingredient/:id" element={ 
          <Modal onClose= {() => closePopup()} isOpened={modal.isIngredient}>
              {modal.isIngredient && <IngredientDetails />}
          </Modal>   }>
        </Route>
        <Route path="/feed/:number" element={
          <Modal onClose={() => closePopup()} isOpened={modal.isOrder}>{modal.isOrder && <OrderDetailsPage/>}
          </Modal>}> 
        </Route>
        <Route path="/profile/orders/:number" element={
          <Modal onClose={() => closePopup()} isOpened={modal.isOrder}>{modal.isOrder && <OrderDetailsPage/>}
          </Modal>}> 
        </Route>
      </Routes>
    )}
    
 
  
  </>
  );
}

export default App;
