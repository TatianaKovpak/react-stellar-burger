import { ConstructorElement, Button, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import update from 'immutability-helper'
import BurgerConstructorStyles from './BurgerConstructor.module.css'
import PropTypes from "prop-types";
import { useEffect, useMemo, useReducer, useRef} from "react";
import { useDrop, useDrag } from 'react-dnd';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { getOrderData } from '../../services/actions/orderActions';

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
    const addedIngredient = useSelector(state => state.ingredients.addedIngredients)
    const data = useSelector(state => state.modal.modalOpened)
    const [ingredients, dispatchModal] = useReducer(reducer, initialState) 
    const dispatch = useDispatch()
  
    const filling = useMemo(() => addedIngredient.filter(i => i.type !== 'bun'), [addedIngredient] ) 
    const bun = useMemo(() => addedIngredient.filter(i => i.type ===  'bun'), [addedIngredient]) 

    const totalPrice = useMemo(() => addedIngredient.reduce((acc, item) => item.type === 'bun' ? acc + (item.price * 2) : acc + item.price, 0), [addedIngredient]) 
   
    function openPopup () {
        if(addedIngredient.length > 0) {
            dispatch(getOrderData(addedIngredient.map(i => i._id)))
              } 
            dispatch({
            type: 'OPEN_MODAL_ORDER'
        })
    }

    function closePopup () {
        dispatch({
            type: 'CLOSE_MODAL'
        })
    }

    useEffect( () => {
        dispatchModal({type: 'sum', payload: totalPrice})
    }, [totalPrice])
    return(
        <>
        <section className={BurgerConstructorStyles.section}>
            <div className={`${BurgerConstructorStyles.burger__element} ${BurgerConstructorStyles.burger__element_top}`}>
              {bun.length ? <BurgerBunTop arr={bun}/> : ''}
            </div>
            <BurgerIngredientsConstructor arr={filling} />
            <div className={BurgerConstructorStyles.burger__element}>
            {bun.length ? <BurgerBunBottom arr={bun}/> : ''}
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
                <Modal onClose= {() => closePopup()} isOpened={data.opened}>
                {data.propsModal.typeBtn !== 'ingredient' ? <OrderDetails /> : <IngredientDetails  ingredient = {data.propsModal.propsBtn}/>}
                </Modal>

            </div> 
        </section>
        </>
    )
}

const BurgerIngredientsConstructor = ({arr}) => {
    const dispatch = useDispatch()
    const addedIngredient = useSelector(state => state.ingredients.addedIngredients)

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
    return (
        <div className={`${isHover ? BurgerConstructorStyles.burger__constructor_hover : BurgerConstructorStyles.burger__constructor} custom-scroll`} ref={dropTarget} >
            
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
    const addedIngredient = useSelector(state => state.ingredients.addedIngredients)

    const sortAddedIngredients = (dragIndex, hoverIndex) => {

        return function (dispatch) {
            const newAddedIngredients = update(addedIngredient,{
                $splice : [
                [dragIndex, 1],
                [hoverIndex, 0, addedIngredient[dragIndex]],
                ]
            })

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
  
   dragRef(addedIngredientDropTarget(ref))
   
    return(
        <div className={isDragging ? BurgerConstructorStyles.burger__element_dragging : BurgerConstructorStyles.burger__element} ref={ref}  >
            
        <div className={BurgerConstructorStyles.burger__element_icon}>
        <DragIcon type="primary" />
          </div>
          <ConstructorElement handleClose = {handleClose} isLocked={false} text={props.name} thumbnail={props.image} price={props.price} />
          
        </div>
    )
}

const BurgerBunTop = ({arr}) => {
    const [i] = arr
    return (
        <>
            {<ConstructorElement type='top' isLocked ={true} text={`${i.name} (верх)`} price={i.price} thumbnail={i.image} key={i._id}/>}
        </>
    )
}

const BurgerBunBottom = ({arr}) => {
    const [i] = arr
    return (
        <>
       
               { <ConstructorElement type='bottom' isLocked ={true} text={`${i.name} (низ)`} price={i.price} thumbnail={i.image} key={i._id}/>}
      
        </>
    )
}
BurgerIngredientsConstructor.propTypes ={
    state: PropTypes.object
  }

export default BurgerConstructor




