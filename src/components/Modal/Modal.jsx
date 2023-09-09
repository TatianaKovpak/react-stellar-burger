import { useEffect} from "react";
import ModalStyles from './Modal.module.css'
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useNavigate } from "react-router-dom";


const modalRoot = document.getElementById('modals');

function Modal (props) {
    const navigate = useNavigate()

    useEffect(() => {
        document.addEventListener('keydown', closeByEscape)
        
        return (() => {
            document.removeEventListener('keydown', closeByEscape)
        })}, [])
        
    function closeByEscape(evt) {
        if (evt.key === 'Escape') {
            props.onClose()
        }
        navigate('/')
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


