import { useDispatch } from '../../services/types/index'
import { FC} from "react";
import ModalOverlayStyles from './ModalOverlay.module.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from '../../services/types/index'
import { CLOSE_MODAL } from '../../services/actions/modalActions'
import { CLEAR_CONSTRUCTOR } from '../../services/actions/ingredientsActions'
import { CLEAR_ORDER } from '../../services/actions/orderActions'
import { TOverlayModal } from '../../services/types/data';

const ModalOverlay : FC<TOverlayModal> = ({active, onClose}) => {
    
    // const modal = useSelector(state => state.modal)
    // const navigate = useNavigate()

    // const dispatch = useDispatch()
    // interface SyntheticEvent<T> {
    //     currentTarget: EventTarget & T;
    //     target : EventTarget & T;
    // }

    // function closePopup (evt: SyntheticEvent<EventTarget>) {
    //     const target = evt.target
    //     if (target instanceof HTMLElement) {
    //         if(/*evt.target && evt.target.*/ target.classList.contains(ModalOverlayStyles.overlay__active)) {

    //             dispatch({
    //                 type: CLOSE_MODAL
    //             })
    //             if(modal.isDetails) {
    //             dispatch({
    //                 type: CLEAR_CONSTRUCTOR
    //             })
            
    //             dispatch({
    //                 type: CLEAR_ORDER
    //             })

    //             }
            
    //         } 
    //     }
    //     if(!modal.isDetails) {
    //         navigate(-1)

    //     }
    // }
 
    return (
        <div className={active ? ModalOverlayStyles.overlay__active : ModalOverlayStyles.overlay} onClick={onClose}>
            
        </div>
    
    )
}

export default ModalOverlay