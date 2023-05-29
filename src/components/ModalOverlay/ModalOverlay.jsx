import ModalOverlayStyles from './ModalOverlay.module.css'
import ReactDOM from "react-dom";
import Modal from '../Modal/Modal';


const modalRoot = document.getElementById('modals');


function ModalOverlay ({setActive, active, modalProp}) {

function closePopup (evt) {
    if(evt.target.classList.contains(ModalOverlayStyles.overlay__active)) {
        setActive(false)
    } 

}

    return ReactDOM.createPortal (
        <div className={active ? ModalOverlayStyles.overlay__active : ModalOverlayStyles.overlay} onClick={closePopup}>
            <Modal modalProp={modalProp} setActive={setActive} active={active} />
        </div>
    , modalRoot
    )
}

export default ModalOverlay