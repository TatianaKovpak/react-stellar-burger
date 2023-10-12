import AppHeader from "../AppHeader/AppHeader";
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import { HomePage } from "../../pages/homePage/home";
import { LoginPage } from "../../pages/loginUserPage/login";
import { RegisterPage } from "../../pages/registerUserPage/register";
import { ForgotPasswordPage } from "../../pages/forgotPasswordPage/forgot-password";
import { ResetPasswordPage } from "../../pages/resetPasswordPage/reset-password";
import { ProfilePage } from "../../pages/profilePage/profile";
import { NotFound404 } from "../../pages/notFoundPage/404";
import { OrderDetailsPage } from "../../pages/orderDetailsPage/orderDetailsPage";
import { useEffect, FC } from 'react'
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { getIngredientsFromServer } from "../../services/actions/ingredientsActions";
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRouteElement";
import { useDispatch, useSelector } from '../../services/types/index'
import { IngredientDetailsPage } from "../../pages/ingredientDetailsPage/ingredient-details";
import { FeedPage } from "../../pages/feedPage/feed";
import { CLOSE_MODAL, OPEN_MODAL_INGREDIENT, OPEN_MODAL_ORDER_DETAILS } from "../../services/actions/modalActions";
import { CLEAR_CONSTRUCTOR } from "../../services/actions/ingredientsActions";
import { CLEAR_ORDER } from "../../services/actions/orderActions";

const App: FC = () => {
  const modal = useSelector(state => state.modal)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const background = location.state && location.state.background; 


  useEffect(() => {
    dispatch(getIngredientsFromServer())
    dispatch( {type: location.pathname.includes('/feed')  ?  OPEN_MODAL_ORDER_DETAILS: ''}   )
    dispatch({type: location.pathname.includes('/ingredient')  ? OPEN_MODAL_INGREDIENT : ''})
    dispatch({type: location.pathname.includes('/profile' ) ?  OPEN_MODAL_ORDER_DETAILS : ''})

    
  }, [dispatch, location])

  function closePopup () {
   navigate(-1)
    dispatch({
        type: CLOSE_MODAL
    });
    if(modal.isDetails) {
      dispatch({
          type: CLEAR_CONSTRUCTOR
      })
  
      dispatch({
          type: CLEAR_ORDER
      })

      }
   
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
      <Route path="/profile/orders/:number" element={<OnlyAuth element = {<OrderDetailsPage/>}/>}/>
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
