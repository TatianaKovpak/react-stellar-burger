import { useDispatch, useSelector } from '../../services/types/index'
import Order from '../../components/Order/Order'
import feedPageStyles from './feed.module.css'
import { useEffect } from 'react'
import { connect, disconnect } from '../../services/actions/socketMiddlewareActions'
import { FC} from "react";



export const FeedPage : FC = () => {
    const allOrders = useSelector(state => state.orders.allOrders)
    const dispatch = useDispatch()
    const url = `wss://norma.nomoreparties.space/orders/all`

    let ordersDone
    let ordersInProgress

    useEffect(() => {
        dispatch(connect(url))
      
        return (() => {
          dispatch(disconnect())
      
      })
    }, [dispatch, url])

    if(allOrders.orders) {
        ordersDone = allOrders.orders.filter(i => i.status === 'done')
        ordersInProgress = allOrders.orders.filter(i => i.status === 'created')
    }

    return (
        <> 
        {allOrders.orders &&
        <>
        <h2 className={`text text_type_main-large ${feedPageStyles.title}`}>Лента заказов</h2>
        <div className={feedPageStyles.page}>
        
        
        <div className={`custom-scroll ${feedPageStyles.scroll} `}>
                    <Order />
        </div>
        <div className={feedPageStyles.info}>
            <div className={feedPageStyles.orders__list}>
                <div >
                    <p className={`text text_type_main-default`}>Готовы:</p>
                    <div className={`custom-scroll text text_type_main-small ${feedPageStyles.orders__number} ${feedPageStyles.orders__number_done}`}>
                    {ordersDone && ordersDone.map(i => {
                        return (
                            <div key={i.number}>{i.number}</div>
                        )
                    })}
                    </div>
                </div>
                <div>
                    <p className={`text text_type_main-default`}>В работе:</p>
                    <div className={`custom-scroll text text_type_main-small ${feedPageStyles.orders__number}`}>
                    {ordersInProgress && ordersInProgress.map(i => {
                        return (
                            <div key={i.number} >{i.number}</div>
                        )
                    })}
                    </div>
                </div>
            </div>
            <div className={feedPageStyles.total__box}>
                <p className={`text text_type_main-default ${feedPageStyles.total__title}` }>Выполнено за все время:</p>
                <div className={`text text_type_main-large ${feedPageStyles.total}`}>{allOrders.total}</div>
            </div>
            <div className={feedPageStyles.total__box}>
                <p className={`text text_type_main-default ${feedPageStyles.total__title}`}>Выполнено за сегодня:</p>
                <div className={`text text_type_main-large ${feedPageStyles.total}`}>{allOrders.totalToday}</div>
            </div>
        </div>
        </div>

        </>
    }  
        </>
    )
                
}