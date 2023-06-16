
import { useEffect, useState } from "react";
import ModalStyles from './Modal.module.css'
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById('modals');



function Modal ({active, setActive, modalProp}) {

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
        setActive(false)
    }

    return ReactDOM.createPortal ( 
            <>
            
                <div className={active ? ModalStyles.modal__active : ModalStyles.modal} >
                    
                    <button className={ModalStyles.close__icon} onClick={closeModal}></button>   
                    {modalProp.btn !== 'ingredient' ? <OrderDetails /> : <IngredientDetails  ingredient = {modalProp.props} />}
                    
                </div>
                <ModalOverlay setActive={setActive} active={active}/>
               
               
            </>
    , modalRoot)
      

}

export default Modal


