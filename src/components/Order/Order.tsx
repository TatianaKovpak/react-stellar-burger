import { useDispatch, useSelector } from '../../services/types/index'
import { FC} from "react";
import orderStyles from './OrderStyles.module.css'
import { Link, To, useLocation } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { OPEN_MODAL_ORDER_DETAILS } from '../../services/actions/modalActions';
import { ingredientInitialState } from '../../pages/orderDetailsPage/orderDetailsPage';
import { TIngredient } from '../../services/types/data';


const Order: FC = () => {
  const allOrders = useSelector((state) => state.orders.allOrders)
  const ingredients = useSelector((state) => state.ingredients.ingredients)
  const dispatch = useDispatch()
  const location = useLocation()
  
  const orderIngredients = []
  let ingredientsWithData = [
    [
        ingredientInitialState[0]
     ]
  ]

  if(allOrders.orders) {
    orderIngredients.push(...allOrders.orders.map(i => i.ingredients ))
    
    
  }
  if(orderIngredients.length > 0) {
    ingredientsWithData = orderIngredients.map(item => {
      return item.map((item2) => {
       return ingredients.filter(elem => item2 === elem._id)[0]
      })
    })

  }


  function openPopup () {
    dispatch({
        type: OPEN_MODAL_ORDER_DETAILS,
     })
     
} 


    return (
        <>
        {allOrders.orders && allOrders.orders.map((i, index) => {
    
            return (
              <div key={i.number}>
              {/* {!i.ingredients.includes(null) && */}
              {i.ingredients.length &&
              <Link  to={location.pathname === '/feed'? {pathname:`/feed/:${i.number}`}:{pathname:`/profile/orders/:${i.number}`}} state={{ background: location }} className={orderStyles.link}  >
              <div className={orderStyles.order} onClick={() => openPopup() }>
                <div className={orderStyles.order__info}>
                <p className={`text text_type_main-small ${orderStyles.order__number}`}>{`#${i.number}`}</p>
                <p className={`text text_type_main-small text_color_inactive`}><FormattedDate date={new Date(i.updatedAt)}/></p>
              </div>
              <h2>{i.name}</h2>
              <ul className={orderStyles.images}>
              
                { ingredientsWithData.length > 1 && ingredientsWithData[index].map((item, index, arr) => { 
                  
                  const deletedElemArr = arr.length - 5
                       return (

                        <li key={item._id + index + i.number} className={orderStyles.image__background}>
                          {arr.length > 6 ?
                          
                          <div  className={orderStyles.image}> 
                             
                             <img  src={item.image} alt={item.name}  className={`${orderStyles.img}  ${index === 5 && arr.length > 6 ? orderStyles.img__last : ''}`}/>
                             <p className={`text text_type_digits-default ${index === 5 ? orderStyles.count__visible : orderStyles.count}`}>{`+${deletedElemArr}`}</p>
                         </div>
                          :
                            <div  className={orderStyles.image} > 
                                <img  src={item.image} alt={item.name} key={item._id + index + i.number} className={`${orderStyles.img}  ${index === 5 && arr.length > 6 ? orderStyles.img__last : ''}`} />
                            </div>
        }
                        </li>   
                                   
                      )
                    }).slice(0,6)
                    
               }
              
               <p className={`text text_type_main-default ${orderStyles.total}`}>{ingredientsWithData[index].reduce((acc, item) => item.type === 'bun' && ingredientsWithData[index].filter(i => i.type === 'bun').length < 2 ?  acc + (item.price * 2) : acc + item.price  ,0)}
               <CurrencyIcon type="primary" />
               </p>
               
              </ul>
              </div>
              </Link>
        }
        </div>
            )
        })
}
       </>
        
    )
}

Order.propTypes = {
  allOrders: PropTypes.object
}

export default Order