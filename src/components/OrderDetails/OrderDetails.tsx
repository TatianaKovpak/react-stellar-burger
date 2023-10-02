import OrderDetailsStyles from './OrderDetails.module.css'
import { FC} from "react";
import { useSelector } from '../../services/types/index';


const OrderDetails: FC = () => {
    const order = useSelector(state => state.order.order)

    return (
        <>
        {order ? <h2 className={`${OrderDetailsStyles.title} text text_type_digits-large`}>{order}</h2> : <h2 className={`text text_type_main-default`}>Ожидайте номер заказа...</h2>}
        
        <p className={`${OrderDetailsStyles.subtitle} text text_type_main-medium`}>идентификатор заказа</p>
        <div className={OrderDetailsStyles.image}></div>
        <p className={`${OrderDetailsStyles.text} text text_type_main-default`}>Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

export default OrderDetails




