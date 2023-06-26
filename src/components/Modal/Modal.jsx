
import { useEffect} from "react";
import ModalStyles from './Modal.module.css'
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useDispatch, useSelector } from "react-redux";

const modalRoot = document.getElementById('modals');



function Modal () {

    const data = useSelector(state => state.burgerIngredients.modalOpened)



    const dispatch = useDispatch()



    useEffect(() => {
        document.addEventListener('keydown', closeByEscape)
        
        return (() => {
            document.removeEventListener('keydown', closeByEscape)
        })}, [])
        
    function closeByEscape(evt) {
        if (evt.key === 'Escape') {
            closeModal()
        }
    }

    function closeModal () {
        dispatch({
            type: 'CLOSE_MODAL'
        })
    }

    return ReactDOM.createPortal ( 
            <>
                <div className={data.opened ? ModalStyles.modal__active : ModalStyles.modal} >
                    
                    <button className={ModalStyles.close__icon} onClick={closeModal}></button>   
                    {data.propsModal.typeBtn !== 'ingredient' ? <OrderDetails /> :  <IngredientDetails  ingredient = {data.propsModal.propsBtn} />}
                    
                </div>
                <ModalOverlay active={data.opened}/>
            </>
    , modalRoot)
}

export default Modal


