import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import ingredientDetailsPageStyles from './ingredientDetailsPage.module.css'
import { FC} from "react";


export const IngredientDetailsPage: FC = () => {
    return(
        <div className={ingredientDetailsPageStyles.page}>
            <IngredientDetails/>
        </div>
    )
}