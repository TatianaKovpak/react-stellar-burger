import { ConstructorElement, Button, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerConstructorStyles from './BurgerConstructor.module.css'
import PropTypes from "prop-types";
import { useEffect, useReducer, useRef, useState} from "react";
import { useDrop, useDrag } from 'react-dnd';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';

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
    const dispatch = useDispatch()
    const addedIngredient = useSelector(state => state.burgerIngredients.addedIngredients)

     const removeItem = item => {
        dispatch({
          type: 'DELETE_SELECTED_INGREDIENT',
          payload: item.id
        });
      };

    const [{isHover}, dropTarget] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
             if (item.props.type !== 'bun') {
                dispatch({
                    type: 'ADD_SELECTED_INGREDIENT',
                    payload: item.props
                }) 
            } else {
                dispatch({
                    type: 'CHANGE_BUN',
                    payload: item._id
                })
            }  
        }
    })

      const borderColor = isHover ? '#4c4cff' : 'transparent'

    return (
        <div className={`${BurgerConstructorStyles.burger__constructor} custom-scroll`} ref={dropTarget} style={{borderColor}}>
            
            {arr.map((i) => {
                    i.index = addedIngredient.indexOf(i)
                return (
                    <BurgerIngredient handleClose = {() => removeItem(i)} index={i.index} props={i} key={i.id} i={i} _id={i._id}  />
                )
            })}
            
        </div>
    )
}

const BurgerIngredient = ({props, handleClose, index, id, i}) => {
    const dispatch = useDispatch()
    const ref = useRef(null)
    const addedIngredient = useSelector(state => state.burgerIngredients.addedIngredients)

    const sortAddedIngredients = (dragIndex, hoverIndex) => {

      return function (dispatch) {
            const newAddedIngredients = [...addedIngredient];
            const dragIngredient = addedIngredient[dragIndex];
            newAddedIngredients.splice(dragIndex, 1)
            newAddedIngredients.splice(hoverIndex, 0, dragIngredient)

          dispatch({
            type: 'SORT_SELECTED_INGREDIENTS',
            payload: newAddedIngredients
          });
       };
      };

    const [{isDragging}, dragRef] = useDrag({
        type: 'addedIngredient',
        item: {i},
        collect: monitor => ({
            isDragging: monitor.isDragging() 
        })
    })

    const [,addedIngredientDropTarget] = useDrop({
        accept: 'addedIngredient',
        hover: (item, monitor) => {
            if(!ref.current) {
                return
            }
            const dragIndex = item.i.index
            const hoverIndex = index
            
            if (dragIndex === hoverIndex) return

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
              return;
            }
      
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
              return;
            }

           dispatch(sortAddedIngredients(dragIndex, hoverIndex))
           
           item.i.index = hoverIndex

        },
        
    })
    const opacity = isDragging? 0 : 1
   dragRef(addedIngredientDropTarget(ref))
   
    return(
        <div className={BurgerConstructorStyles.burger__element} style={{opacity}} ref={ref}  >
            
        <div className={BurgerConstructorStyles.burger__element_icon}>
        <DragIcon type="primary" />
          </div>
          <ConstructorElement handleClose = {handleClose} isLocked={false} text={props.name} thumbnail={props.image} price={props.price} />
          
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
BurgerIngredientsConstructor.propTypes ={
    state: PropTypes.object
  }

export default BurgerConstructor




