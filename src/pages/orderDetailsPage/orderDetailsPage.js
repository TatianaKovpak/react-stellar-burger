import { useDispatch, useSelector} from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { getIngredientsFromServer } from "../../services/actions/ingredientsActions";
import  { useEffect } from 'react';
import orderDetailsPageStyles from './orderDetailsPage.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';



export function OrderDetailsPage () {
    const allOrders = useSelector((state) => state.orders.allOrders)
    const ingredients = useSelector((state) => state.ingredients.ingredients)
    const dispatch = useDispatch()
    const location = useLocation()
    const token = localStorage.getItem('accessToken').replace('Bearer ', '')
    
    
    useEffect(() => {
       
        dispatch({type: 'WS_CONNECTION_START', payload : location.pathname.includes('/feed/') ? `wss://norma.nomoreparties.space/orders/all` : `wss://norma.nomoreparties.space/orders?token=${token}`})
        dispatch(getIngredientsFromServer())
      }, [dispatch, token, location.pathname])

    const params = useParams()
    const number = Number(params.number.slice(1))
    

    const background = location.state && location.state.background; 
    
   
    let openedOrder
    let ingredientsWithData
    let uniqueIngredients
    let totalPrice
    
   
   
     if(allOrders.orders && ingredients) {
        openedOrder =  allOrders.orders.find(i => i.number === number)
       

        ingredientsWithData = openedOrder.ingredients.map(item => {
            return ingredients.filter(elem => item === elem._id)[0]
         })
         const buns = ingredientsWithData.filter(i => i.type === 'bun')
         
         totalPrice = ingredientsWithData.reduce((acc, item) => item.type === 'bun' && buns.length < 2 ?  acc + (item.price * 2) : acc + item.price ,0)

        uniqueIngredients = ingredientsWithData.reduce((acc, item) => {
            if (acc.includes(item)) {
                return acc
            }
            return [...acc, item]
        }, []) 
        
     }
 
    return (
        <div className={orderDetailsPageStyles.page}>
        {allOrders.orders &&
        <div className={background ? orderDetailsPageStyles.order__modal : orderDetailsPageStyles.order}>
            <p className={` text text_type_digits-default ${background ? orderDetailsPageStyles.order__number_modal : orderDetailsPageStyles.order__number}`}>{`#${openedOrder.number}`}</p>
            <h2 className={`text text_type_main-medium ${orderDetailsPageStyles.title}`}>{openedOrder.name}</h2>
            <p className={`text text_type_main-default ${openedOrder.status === 'done' ? orderDetailsPageStyles.order__status : openedOrder.status === 'created' ? orderDetailsPageStyles.order__status_in_progress : orderDetailsPageStyles.order__status_canceled}`}>
                {openedOrder.status === 'done' ? 'Выполнен' : openedOrder.status === 'created' ? 'Готовится' : 'Отменен' }</p>
            <h3 className={`text text_type_main-default ${orderDetailsPageStyles.order__compound_title}`}>Состав:</h3>
            <div className={`custom-scroll ${orderDetailsPageStyles.ingredients}`}>
                {uniqueIngredients.map((i,index) => {
                     return(
                        <div key={i._id + index} className={orderDetailsPageStyles.ingredient}> 
                            <div className={orderDetailsPageStyles.ingredient__image_background}>
                            <div className={orderDetailsPageStyles.ingredient__image}>
                              <img className={orderDetailsPageStyles.image} src={i.image_mobile} alt={i.name}/>
                            </div>
                            </div>
                          <p className={`text text_type_main-default ${orderDetailsPageStyles.ingredient__title}`}>{i.name}</p>
                          <p className={`text text_type_digits-default ${orderDetailsPageStyles.price}`}>
                            {i.price} x { (ingredientsWithData.filter(item => item.type !=='bun' && item.name === i.name).length) || ((ingredientsWithData.filter(item => item.type === 'bun').length === 1 || 2 ) && 2) }
                           <CurrencyIcon type="primary" /></p>
                        </div>
                    )
                })}
            </div>
                <div className={orderDetailsPageStyles.total}>
                    <p className={`text text_type_main-default text_color_inactive`}><FormattedDate date={new Date(openedOrder.updatedAt)}/> </p>
                    <p className={`text text_type_digits-default ${orderDetailsPageStyles.sum}`}>{totalPrice} <CurrencyIcon type="primary" /></p>
                </div>
        </div>
       
            }
        </div>
    )

}
