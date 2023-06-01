import ModalOverlayStyles from './ModalOverlay.module.css'






function ModalOverlay ({active, setActive}) {

function closePopup (evt) {
    if(evt.target.classList.contains(ModalOverlayStyles.overlay__active)) {
        setActive(false)
    } 

}

    return (
        <div className={active ? ModalOverlayStyles.overlay__active : ModalOverlayStyles.overlay} onClick={closePopup}>
            
        </div>
    
    )
}

export default ModalOverlay