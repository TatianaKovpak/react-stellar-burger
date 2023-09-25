import { useEffect} from "react";
import ModalStyles from './Modal.module.css'
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";


const modalRoot = document.getElementById('modals');

function Modal (props) {

    useEffect(() => {
        document.addEventListener('keydown', closeByEscape)
        
        return (() => {
            document.removeEventListener('keydown', closeByEscape)
        })}, [closeByEscape])
        
    function closeByEscape(evt) {
        if (evt.key === 'Escape') {
            props.onClose()
        }
        
    }

    

    return ReactDOM.createPortal ( 
            <>
                <div className={ props.isOpened ? ModalStyles.modal__active : ModalStyles.modal} >
                    <button className={ModalStyles.close__icon} onClick={props.onClose}></button>   
                    {props.children}
                </div>
                <ModalOverlay active={props.isOpened}/>
            </>
    , modalRoot)
}

export default Modal


