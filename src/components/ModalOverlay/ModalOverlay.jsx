import { useDispatch } from 'react-redux'
import ModalOverlayStyles from './ModalOverlay.module.css'






function ModalOverlay ({active}) {

    const dispatch = useDispatch()

function closePopup (evt) {
    console.log(evt.target)
    if(evt.target.classList.contains(ModalOverlayStyles.overlay__active)) {
        dispatch({
            type: 'CLOSE_MODAL'
        })
    } 

}

    return (
        <div className={active ? ModalOverlayStyles.overlay__active : ModalOverlayStyles.overlay} onClick={closePopup}>
            
        </div>
    
    )
}

export default ModalOverlay