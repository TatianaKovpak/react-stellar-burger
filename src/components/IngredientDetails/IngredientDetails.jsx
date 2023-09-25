import { useSelector } from 'react-redux';
import IngredientDetailsStyles from './IngredientDetails.module.css'
import { useParams } from 'react-router-dom';


function IngredientDetails() {
    const ingredients = useSelector((state) => state.ingredients.ingredients)
  
    
    
    const params = useParams()
    const id = params.id.slice(1)
    const openedIngredient = ingredients.length > 0 ? ingredients.filter(i => i._id === id)[0] : {}
    
 
    return (
      <>
        <h2 className={` text text_type_main-large ${IngredientDetailsStyles.title}`}>Детали ингредиента</h2>
        <img src={openedIngredient.image} alt="" className={IngredientDetailsStyles.image}/>
        <h3 className={`${IngredientDetailsStyles.subtitle} text text_type_main-medium`}>{openedIngredient.name}</h3>
        <div>
           <div className={IngredientDetailsStyles.details}>

            <div className={IngredientDetailsStyles.details__container}>
                <p className={`text text_type_main-default text_color_inactive`}>Калории,ккал</p>
                <p className={`text text_type_main-default text_color_inactive`}>{openedIngredient.calories}</p>
            </div>

            <div className={IngredientDetailsStyles.details__container}>
                <p className={`text text_type_main-default text_color_inactive`}>Белки, г</p>
                <p className={`text text_type_main-default text_color_inactive`}>{openedIngredient.proteins}</p>
            </div>

            <div className={IngredientDetailsStyles.details__container}>
                <p className={`text text_type_main-default text_color_inactive`}>Жиры, г</p>
                <p className={`text text_type_main-default text_color_inactive`}>{openedIngredient.fat}</p>
            </div>

            <div className={IngredientDetailsStyles.details__container}>
                <p className={`text text_type_main-default text_color_inactive`}>Углеводы, г</p>
                <p className={`text text_type_main-default text_color_inactive`}>{openedIngredient.carbohydrates}</p>
            </div>

          </div>
        </div>
        </>
       
    )
}




export default IngredientDetails