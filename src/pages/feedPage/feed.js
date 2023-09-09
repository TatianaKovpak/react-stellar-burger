import { useDispatch, useSelector } from 'react-redux'
import Order from '../../components/Order/Order'
import feedPageStyles from './feed.module.css'
import { useEffect } from 'react'
import { getIngredientsFromServer } from '../../services/actions/ingredientsActions'


export function FeedPage () {
    const allOrders = useSelector(state => state.orders.allOrders)
    const dispatch = useDispatch()

    let ordersDone
    let ordersInProgress
    let key

    useEffect(() => {
        dispatch({type: 'WS_CONNECTION_START', payload : `wss://norma.nomoreparties.space/orders/all`})
        dispatch(getIngredientsFromServer())
      }, [dispatch])

   

    if(allOrders.orders) {
        ordersDone = allOrders.orders.filter(i => i.status === 'done')
        ordersInProgress = allOrders.orders.filter(i => i.status === 'created')
        key = allOrders.orders.map(i => i.number)
    }



    return (
        <div>
        {allOrders.orders &&
        <>
        <h2 className={`text text_type_main-large ${feedPageStyles.title}`}>Лента заказов</h2>
        <div className={feedPageStyles.page}>
        
        
        <div className={`custom-scroll ${feedPageStyles.scroll} `}>
                    <Order key={key} allOrders={allOrders} />
                   
        </div>
        <div className={feedPageStyles.info}>
            <div className={feedPageStyles.orders__list}>
                <div >
                    <p className={`text text_type_main-default`}>Готовы:</p>
                    <div className={`custom-scroll text text_type_main-small ${feedPageStyles.orders__number} ${feedPageStyles.orders__number_done}`}>
                    {ordersDone.map(i => {
                        return (
                         <>
                            <div key={i.number}>{i.number}</div>
                         </>
                        )
                    })}
                    </div>
                </div>
                <div>
                    <p className={`text text_type_main-default`}>В работе:</p>
                    <div className={`custom-scroll text text_type_main-small ${feedPageStyles.orders__number}`}>
                    {ordersInProgress.map(i => {
                        return (
                            <>
                            <div key={i.number} >{i.number}</div>
                            </>
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
        </div> 
    )
                
}