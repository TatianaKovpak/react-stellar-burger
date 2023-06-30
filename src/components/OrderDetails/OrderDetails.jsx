import OrderDetailsStyles from './OrderDetails.module.css'
import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderData } from '../../services/actions/actions';

function OrderDetails () {
    const addedIngredient = useSelector(state => state.burgerIngredients.addedIngredients)
    
    const order = useSelector(state => state.burgerIngredients.order)
    const dispatch = useDispatch()

    useEffect(() => {
        if(addedIngredient.length > 0) {
          dispatch(getOrderData(addedIngredient.map(i => i._id)))
            } 
        },[dispatch, addedIngredient])

    return (
        <>
        <h2 className={`${OrderDetailsStyles.title} text text_type_digits-large`}>{order}</h2>
        <p className={`${OrderDetailsStyles.subtitle} text text_type_main-medium`}>идентификатор заказа</p>
        <div className={OrderDetailsStyles.image}></div>
        <p className={`${OrderDetailsStyles.text} text text_type_main-default`}>Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

export default OrderDetails




