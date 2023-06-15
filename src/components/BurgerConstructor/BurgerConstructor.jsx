import { ConstructorElement, Button, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerConstructorStyles from './BurgerConstructor.module.css'
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from "prop-types";
import { useContext, useEffect, useReducer, useState} from "react";
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import Modal from '../Modal/Modal';
import { IngredientApiContext, IngredientContext } from '../../services/ingredientContext';
import uuid from 'react-uuid';

const initialState = {
    totalPrice: 0
}

function reducer (state, action) {
    switch (action.type) {
    
        case 'sum' : 
          return  {
            totalPrice : action.payload
        }

         default:
          throw new Error(`Wrong type of action: ${action.type}`);
    }
}

function BurgerConstructor ({state}) {
    const {addedIngredient} = useContext(IngredientContext)

    const [ingredients, dispatch] = useReducer(reducer, initialState)

    const filling = addedIngredient.filter(i => i.type !== 'bun')
    const bun = addedIngredient.filter(i => i.type ===  'bun')
    
    const [modalActive, setModalActive] = useState(false)
    const [modalProp, setModalProp] = useState({})

    const totalPrice = addedIngredient.reduce((acc, item) => item.type === 'bun' ? acc + (item.price * 2) : acc + item.price, 0)

    state.setModalActive = setModalActive
    state.setModalProp = setModalProp
   
    function openPopup () {
        setModalProp({
            btn : 'order',
            props : {}
        })
        setModalActive(true)
    }

    useEffect( () => {
        dispatch({type: 'sum', payload: totalPrice})
    }, [totalPrice])
        
    return(
        <>
        <section className={BurgerConstructorStyles.section}>
            
            
            <div className={`${BurgerConstructorStyles.burger__element} ${BurgerConstructorStyles.burger__element_top}` }>
              <BurgerBunTop arr={bun}/>
            </div>
            <BurgerIngredientsConstructor arr={filling} />
            <div className={BurgerConstructorStyles.burger__element}>
              <BurgerBunBottom arr={bun}/>
            </div>
            <div className={BurgerConstructorStyles.sum__container}>
                <div className={BurgerConstructorStyles.sum}>
                    <p className="text text_type_digits-medium">{ingredients.totalPrice}</p>
                    <div className={BurgerConstructorStyles.sum__icon}>
                    <CurrencyIcon type="primary" />
                    </div>
                </div>
                <div>
                    <Button htmlType="button" type="primary" size="medium" onClick={openPopup}>Оформить заказ</Button>
                </div>
                <Modal active={modalActive} modalProp = {modalProp}  setActive={setModalActive}/>

            </div> 
        </section>
        </>
    )
}

const BurgerIngredientsConstructor = ({arr}) => {
    
    return (
        <div className={`${BurgerConstructorStyles.burger__constructor} custom-scroll`}>
            {arr.map(i => {
                return (
                    
                    <BurgerIngredient props={i} key={uuid()} />
                   
                )
            })}
        </div>
    )
}


const BurgerIngredient = ({props}) => {
    
    return(
        <div className={BurgerConstructorStyles.burger__element  }>
        <div className={BurgerConstructorStyles.burger__element_icon}>
        <DragIcon type="primary" />
          </div>
          <ConstructorElement isLocked={false} text={props.name} thumbnail={props.image} price={props.price}/>
        </div>
    )
}


const BurgerBunTop = ({arr}) => {
    return (
        <>
        {arr.map(i => {
            return (
                <ConstructorElement type='top' isLocked ={true} text={`${i.name} (верх)`} price={i.price} thumbnail={i.image} key={i._id}/>
            )
        })}
        </>
    )
}

const BurgerBunBottom = ({arr}) => {
    return (
        <>
        {arr.map(i => {
            return (
                <ConstructorElement type='bottom' isLocked ={true} text={`${i.name} (низ)`} price={i.price} thumbnail={i.image} key={i._id}/>
            )
        })}
        </>
    )
}
BurgerConstructor.propTypes ={
    /*ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,*/
    state: PropTypes.object
  }

export default BurgerConstructor