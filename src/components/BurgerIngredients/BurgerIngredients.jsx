import { Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from "prop-types";


function BurgerIngredients ({ingredientsApi, state}) {
    const bun = ingredientsApi.filter( i => i.type === 'bun');
    const sauce = ingredientsApi.filter( i => i.type === 'sauce');
    const main = ingredientsApi.filter(i => i.type === 'main')

    return (
        <section className={BurgerIngredientsStyles.section}>
            <h1 className={`${BurgerIngredientsStyles.title} text text_type_main-large`}>Соберите бургер</h1>
            <div className={BurgerIngredientsStyles.menu}>
                <Tab className="text text_type_main-default" active={true} >Булки</Tab>
                <Tab className="text text_type_main-default" >Соусы</Tab>
                <Tab className="text text_type_main-default" >Начинки</Tab>
            </div>
         
            <div className={`custom-scroll ${BurgerIngredientsStyles.scroll}`}>
               <h2 className={`${BurgerIngredientsStyles.subtitle} text text_type_main-default`}>Булки</h2>
               <IngredientContainer state={state} arr={bun}/>
               <h2 className={`${BurgerIngredientsStyles.subtitle} text text_type_main-default`}>Соусы</h2>
               <IngredientContainer state={state} arr={sauce}/>
               <h2 className={`${BurgerIngredientsStyles.subtitle} text text_type_main-default`}>Начинки</h2>
               <IngredientContainer state={state} arr={main}/>
            </div>       
        </section>       
    )
}

const IngredientContainer = ({arr, state}) => {
   return (
    <div className={BurgerIngredientsStyles.ingredient_container}>
        {arr.map(i => {
            return (
                <Ingredient state={state} props={i} key={i._id}/> 
            )
        })}
    </div>


   )
}
 const Ingredient = ({props, state}) => {

    function editModalWindow () {
        state.setModalProp({
            btn: 'ingredient',
            props : props
        })
        state.setModalActive(true)
    }
    
    return (
        <div className={BurgerIngredientsStyles.ingredient} onClick={editModalWindow}>
            <img src={props.image} alt={props.name} />
            <div className={BurgerIngredientsStyles.box}>
               <p className={`${BurgerIngredientsStyles.ingredient__price} text text_type_digits-default`}>{props.price}</p>
               <div className={BurgerIngredientsStyles.ingredient__icon}>
               <CurrencyIcon type="primary" />
               </div>
            </div>
            <div className={BurgerIngredientsStyles.ingredient__counter}>
            <Counter />
            </div>
            <p className={`${BurgerIngredientsStyles.ingredient__title} text text_type_main-default`}>{props.name}</p>
        </div>  
    )
 }

 BurgerIngredients.propTypes ={
    ingredientsApi: PropTypes.arrayOf(ingredientPropType).isRequired,
    state: PropTypes.object
 }

export default BurgerIngredients