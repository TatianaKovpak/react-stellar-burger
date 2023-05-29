
import { useEffect, useState } from "react";
import ModalStyles from './Modal.module.css'
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";


function Modal ({setActive, modalProp}) {

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

    return ( <>
                <div className={ModalStyles.modal} >
                    <button className={ModalStyles.close__icon} onClick={closeModal}></button>   
                    {modalProp.btn !== 'ingredient' ? <OrderDetails /> : <IngredientDetails ingredient = {modalProp.props} />}
                </div>
            </>
    )
      

}

export default Modal


