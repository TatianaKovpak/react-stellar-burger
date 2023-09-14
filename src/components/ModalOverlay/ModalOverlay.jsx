import { useDispatch } from 'react-redux'
import ModalOverlayStyles from './ModalOverlay.module.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CLOSE_MODAL } from '../../services/actions/modalActions'
import { CLEAR_CONSTRUCTOR } from '../../services/actions/ingredientsActions'
import { CLEAR_ORDER } from '../../services/actions/orderActions'

function ModalOverlay ({active}) {
    const modal = useSelector(state => state.modal)
    const navigate = useNavigate()

    const dispatch = useDispatch()

function closePopup (evt) {
    if(evt.target.classList.contains(ModalOverlayStyles.overlay__active)) {

        dispatch({
            type: CLOSE_MODAL
        })
        dispatch({
            type: CLEAR_CONSTRUCTOR
        })
        dispatch({
            type: CLEAR_ORDER
        })
    } 
    if(!modal.isDetails) {
        navigate(-1)

    }
    

}

    return (
        <div className={active ? ModalOverlayStyles.overlay__active : ModalOverlayStyles.overlay} onClick={closePopup}>
            
        </div>
    
    )
}

export default ModalOverlay