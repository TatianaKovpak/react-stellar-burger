import { useDispatch, useSelector} from "../../services/types/index";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import orderDetailsPageStyles from './orderDetailsPage.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { connect, disconnect } from "../../services/actions/socketMiddlewareActions";
import { FC } from "react";
import { TIngredient, TOrders, TOrder } from "../../services/types/data";


export const ingredientInitialState: TIngredient[] = [
    {
        _id: '',
        name: '',
        type: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0,
    }
]


export const OrderDetailsPage: FC = () => {
    const allOrders = useSelector((state) => state.orders.allOrders)
    const ingredients = useSelector((state) => state.ingredients.ingredients)

    const dispatch = useDispatch()
    const location = useLocation()
    const token = localStorage.getItem('accessToken')
    const url = location.pathname.includes('/feed/') ? `wss://norma.nomoreparties.space/orders/all` : token ? `wss://norma.nomoreparties.space/orders?token=${token.replace('Bearer ', '') }` : ''
   

    useEffect(() => {
        dispatch(connect(url))
        return (() => {
            dispatch(disconnect())
        })
        
     
      }, [dispatch, url])

    const params = useParams()
    let number: number

    if(params.number) {
        number = Number(params.number.slice(1))
    }
     
    const background = location.state && location.state.background; 
    
   
    let openedOrder: TOrder  = {
        createdAt: '',
        ingredients: [],
        name: '',
        number: 0,
        status: '',
        updatedAt: '',
        _id: ''
    }
    
    let ingredientsWithData = ingredientInitialState
    let uniqueIngredients: TIngredient[] = []
    let totalPrice: number = 0
    
  
    
     if(allOrders.orders.length > 0 ) {
        openedOrder =  allOrders.orders.find(i => i.number === number)

       if(openedOrder) {
          ingredientsWithData = openedOrder.ingredients.map(item => {
              return ingredients.filter(elem => item === elem._id)[0]
           })
       }
        
         const buns = ingredientsWithData.filter(i => i.type === 'bun')
         
         totalPrice = ingredientsWithData.reduce((acc, item) => item.type === 'bun' && buns.length < 2 ?  acc + (item.price * 2) : acc + item.price  ,0)

        uniqueIngredients = ingredientsWithData.reduce((acc, item) => {
            if (acc.includes(item)) {
                return acc
            }
            return [...acc, item]
        }, []) 
        
     }
     console.log(openedOrder)
    return (
        <div className={orderDetailsPageStyles.page}>
        {allOrders.orders && ingredients.length && openedOrder &&
        <div className={background ? orderDetailsPageStyles.order__modal : orderDetailsPageStyles.order}>
            <p className={` text text_type_digits-default ${background ? orderDetailsPageStyles.order__number_modal : orderDetailsPageStyles.order__number}`}>{`#${openedOrder.number}`}</p>
            <h2 className={`text text_type_main-medium ${orderDetailsPageStyles.title}`}>{openedOrder.name}</h2>
            <p className={`text text_type_main-default ${openedOrder.status === 'done' ? orderDetailsPageStyles.order__status : openedOrder.status === 'created' ? orderDetailsPageStyles.order__status_in_progress : orderDetailsPageStyles.order__status_canceled}`}>
                {openedOrder.status === 'done' ? 'Выполнен' : openedOrder.status === 'created' ? 'Готовится' : 'Отменен' }</p>
            <h3 className={`text text_type_main-default ${orderDetailsPageStyles.order__compound_title}`}>Состав:</h3>
            <div className={`custom-scroll ${orderDetailsPageStyles.ingredients}`}>
                {uniqueIngredients && uniqueIngredients.map((i,index) => {
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
                    <p className={`text text_type_digits-default ${orderDetailsPageStyles.sum}`}>{ totalPrice} <CurrencyIcon type="primary" /></p>
                </div>
        </div>
       
            }
        </div>
    )

}
