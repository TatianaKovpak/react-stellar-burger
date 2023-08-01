
import IngredientDetailsStyles from './IngredientDetails.module.css'
import { ingredientPropType } from "../../utils/prop-types";


function IngredientDetails({ingredient}) {
    return (
        <>
        <h2 className={` text text_type_main-large ${IngredientDetailsStyles.title}`}>Детали ингредиента</h2>
        <img src={ingredient.image} alt="" className={IngredientDetailsStyles.image}/>
        <h3 className={`${IngredientDetailsStyles.subtitle} text text_type_main-medium`}>{ingredient.name}</h3>
        <div>
           <div className={IngredientDetailsStyles.details}>

            <div className={IngredientDetailsStyles.details__container}>
                <p className={`text text_type_main-default text_color_inactive`}>Калории,ккал</p>
                <p className={`text text_type_main-default text_color_inactive`}>{ingredient.calories}</p>
            </div>

            <div className={IngredientDetailsStyles.details__container}>
                <p className={`text text_type_main-default text_color_inactive`}>Белки, г</p>
                <p className={`text text_type_main-default text_color_inactive`}>{ingredient.proteins}</p>
            </div>

            <div className={IngredientDetailsStyles.details__container}>
                <p className={`text text_type_main-default text_color_inactive`}>Жиры, г</p>
                <p className={`text text_type_main-default text_color_inactive`}>{ingredient.fat}</p>
            </div>

            <div className={IngredientDetailsStyles.details__container}>
                <p className={`text text_type_main-default text_color_inactive`}>Углеводы, г</p>
                <p className={`text text_type_main-default text_color_inactive`}>{ingredient.carbohydrates}</p>
            </div>

          </div>
        </div>
        
        </>
    )
}

IngredientDetails.propTypes = {
    ingredient: ingredientPropType
 }


export default IngredientDetails