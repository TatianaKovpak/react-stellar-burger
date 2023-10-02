import { useEffect, FC} from "react";
import ModalStyles from './Modal.module.css'
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { TModal } from "../../services/types/data";


const modalRoot: HTMLElement = document.getElementById('modals') as HTMLElement;
console.log(modalRoot)
const Modal: FC <TModal> = ({isOpened, onClose, children}) => {
    
    useEffect(() => {
        document.addEventListener('keydown', closeByEscape)
        
        return (() => {
            document.removeEventListener('keydown', closeByEscape)
        })}, [closeByEscape])
        
    function closeByEscape(evt: KeyboardEvent) {
        if (evt.key === 'Escape') {
            onClose()
        }
    }

    return ReactDOM.createPortal ( 
            <>
                <div className={ isOpened ? ModalStyles.modal__active : ModalStyles.modal} >
                    <button className={ModalStyles.close__icon} onClick={onClose}></button>   
                    {children}
                </div>
                <ModalOverlay active={isOpened}/>
            </>
    , modalRoot)
}

export default Modal


