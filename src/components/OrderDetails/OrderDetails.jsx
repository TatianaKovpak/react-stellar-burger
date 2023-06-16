import OrderDetailsStyles from './OrderDetails.module.css'

function OrderDetails () {

    return (
        <>
        <h2 className={`${OrderDetailsStyles.title} text text_type_digits-large`}>034536</h2>
        <p className={`${OrderDetailsStyles.subtitle} text text_type_main-medium`}>идентификатор заказа</p>
        <div className={OrderDetailsStyles.image}></div>
        <p className={`${OrderDetailsStyles.text} text text_type_main-default`}>Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

export default OrderDetails