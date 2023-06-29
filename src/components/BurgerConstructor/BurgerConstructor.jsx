import { ConstructorElement, Button, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerConstructorStyles from './BurgerConstructor.module.css'
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from "prop-types";
import { useEffect, useReducer, useRef, useState} from "react";
import { useDrop, useDrag } from 'react-dnd';

import Modal from '../Modal/Modal';

import uuid from 'react-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../services/actions/actions';



export  const initialState = {
    totalPrice: 0,
    counter: 0
}

export  function reducer (state, action) {
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
    const [item, setItem] = useState(null)
    const dispatch = useDispatch()

     const removeItem = item => {
        
        dispatch({
          type: 'DELETE_SELECTED_INGREDIENT',
          payload: item.id
        });
      };

    const [{isHover}, dropTarget] = useDrop({
        accept: ['ingredient','addedIngredient'],
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            dispatch({
                type: 'ADD_SELECTED_INGREDIENT',
                payload: item._id
            }) 
            dispatch({
                type: 'CHANGE_BUN',
                payload: item._id
            })
            dispatch({
                type: 'SORT_SELECTED_INGREDIENTS',
                payload: item
            }) 
        }
    })
      const borderColor = isHover ? '#4c4cff' : 'transparent'

     

    return (
        <div className={`${BurgerConstructorStyles.burger__constructor} custom-scroll`} ref={dropTarget} style={{borderColor}}>
            {arr.map((i, index) => {
            
                i.id = (uuid())
                return (
                    <BurgerIngredient handleClose = {() => removeItem(i)}  props={i} key={i.id}  i ={i} _id={i._id} />
                )
            })}
        </div>
    )
}

const BurgerIngredient = ({props, handleClose, _id, i}) => {
    const [{opacity}, dragRef] = useDrag({
        type: 'addedIngredient',
        item: {i},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })
   
    return(
        <div className={BurgerConstructorStyles.burger__element} style={{opacity}} ref={dragRef} >
        <div className={BurgerConstructorStyles.burger__element_icon}>
        <DragIcon type="primary" />
          </div>
          <ConstructorElement handleClose = {handleClose} isLocked={false} text={props.name} thumbnail={props.image} price={props.price}/>
        </div>
    )
}

const BurgerBunTop = ({arr}) => {
    return (
        <>
        {arr.map((i) => {
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




