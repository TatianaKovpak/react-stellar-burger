import { ConstructorElement, Button, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerConstructorStyles from './BurgerConstructor.module.css'
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from "prop-types";
import { useEffect, useReducer, useRef} from "react";
import { useDrop } from 'react-dnd';

import Modal from '../Modal/Modal';

import uuid from 'react-uuid';
import { useDispatch, useSelector } from 'react-redux';



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

function BurgerConstructor () {
    const addedIngredient = useSelector(state => state.burgerIngredients.addedIngredients)
    const [ingredients, dispatch] = useReducer(reducer, initialState) 

    const filling = addedIngredient.filter(i => i.type !== 'bun')
    const bun = addedIngredient.filter(i => i.type ===  'bun')

    const totalPrice = addedIngredient.reduce((acc, item) => item.type === 'bun' ? acc + (item.price * 2) : acc + item.price, 0)

    const dispatchModal = useDispatch()
   
    function openPopup () {
            dispatchModal({
            type: 'OPEN_MODAL_ORDER'
        })
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
                <Modal/>

            </div> 
        </section>
        </>
    )
}

const BurgerIngredientsConstructor = ({arr}) => {
    const res = useSelector(data => data.burgerIngredients)
    console.log(res)
    const dispatch = useDispatch()
    const [{isHover}, dropTarget] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            dispatch({
                type: 'ADD_SELECTED_INGREDIENT',
                action: item._id
            })
        }
    })
  
    const borderColor = isHover ? 'purple' : 'transparent'
    return (
        <div className={`${BurgerConstructorStyles.burger__constructor} custom-scroll`} ref={dropTarget} style={{borderColor}}>
            {arr.map(i => {
                
                return (
                    <BurgerIngredient onClick={e => console.log(e.target)} props={i} key={i.key} />
                )
            })}
        </div>
    )
}


const BurgerIngredient = ({props}) => {
    const ref = useRef(null)
    console.log(ref.current)
    return(
        <div className={BurgerConstructorStyles.burger__element} >
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
    state: PropTypes.object
  }

export default BurgerConstructor