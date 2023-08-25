import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import ingredientDetailsPageStyles from './ingredientDetailsPage.module.css'



export function IngredientDetailsPage() {
    return(
        <div className={ingredientDetailsPageStyles.page}>
            <IngredientDetails/>
        </div>
    )
}