import OrderDetailsStyles from './OrderDetails.module.css'
import React, { useEffect, useState } from 'react';
import { IngredientContext } from '../../services/ingredientContext';
import { postOrder } from '../../utils/api-burger';

function OrderDetails () {
    const {addedIngredient} = React.useContext(IngredientContext)
    const [orderCode, setOrderCode] = useState('')

    useEffect(async () => {
        if(addedIngredient.length > 0) {
          postOrder(addedIngredient.map(i => i._id))
          .then(res => {
             const {order} = res
             setOrderCode(order.number)
          }).catch(e => console.log(e))
      }
    }, [addedIngredient])

    return (
        <>
        <h2 className={`${OrderDetailsStyles.title} text text_type_digits-large`}>{orderCode}</h2>
        <p className={`${OrderDetailsStyles.subtitle} text text_type_main-medium`}>идентификатор заказа</p>
        <div className={OrderDetailsStyles.image}></div>
        <p className={`${OrderDetailsStyles.text} text text_type_main-default`}>Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

export default OrderDetails