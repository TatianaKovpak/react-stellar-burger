import { ConstructorElement, Button, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerConstructorStyles from './BurgerConstructor.module.css'
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ModalOverlay from '../ModalOverlay/ModalOverlay';



function BurgerConstructor ({ingredientsApi, state}) {
    const filling = ingredientsApi.filter(i => i.type !== 'bun')
    const bun = ingredientsApi.filter(i => i.name ===  'Краторная булка N-200i')

    const [modalActive, setModalActive] = useState(false)
    const [modalProp, setModalProp] = useState({})

    state.setModalActive = setModalActive
    state.setModalProp = setModalProp
   
    function openPopup () {
        setModalProp({
            btn : 'order',
            props : {}
        })
        setModalActive(true)

    }

    return(
        <section className={BurgerConstructorStyles.section}>
            <div className={`${BurgerConstructorStyles.burger__element} ${BurgerConstructorStyles.burger__element_top}` }>
              <BurgerBunTop arr={bun}/>
            </div>
            <BurgerIngredientsConstructor arr={filling}/>
            <div className={BurgerConstructorStyles.burger__element}>
              <BurgerBunBottom arr={bun}/>
            </div>
            <div className={BurgerConstructorStyles.sum__container}>
                <div className={BurgerConstructorStyles.sum}>
                    <p className="text text_type_digits-medium">0</p>
                    <div className={BurgerConstructorStyles.sum__icon}>
                    <CurrencyIcon type="primary" />
                    </div>
                </div>
                <div>
                    <Button htmlType="button" type="primary" size="medium" onClick={openPopup}>Оформить заказ</Button>
                </div>
                <ModalOverlay active={modalActive} modalProp = {modalProp}  setActive={setModalActive}/>
                    
              
            </div>
        </section>
    )
}

const BurgerIngredientsConstructor = ({arr}) => {
    
    return (
        <div className={`${BurgerConstructorStyles.burger__constructor} custom-scroll`}>
            {arr.map(i => {
                return (
                    <BurgerIngredient props={i} key={i._id} />
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
    ingredientsApi: PropTypes.arrayOf(ingredientPropType).isRequired,
    state: PropTypes.object
  }

export default BurgerConstructor