import { useDispatch } from 'react-redux'
import ModalOverlayStyles from './ModalOverlay.module.css'
import { useNavigate } from 'react-router-dom'

function ModalOverlay ({active}) {
    const navigate = useNavigate()

    const dispatch = useDispatch()

function closePopup (evt) {
    if(evt.target.classList.contains(ModalOverlayStyles.overlay__active)) {

        dispatch({
            type: 'CLOSE_MODAL'
        })
    } 
    navigate(-1)

}

    return (
        <div className={active ? ModalOverlayStyles.overlay__active : ModalOverlayStyles.overlay} onClick={closePopup}>
            
        </div>
    
    )
}

export default ModalOverlay