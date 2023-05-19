import { Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from "prop-types";

function BurgerIngredients ({props}) {
    const bun = props.filter( i => i.type === 'bun');
    const sauce = props.filter( i => i.type === 'sauce');
    const main = props.filter(i => i.type === 'main')



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
               <IngredientContainer arr={bun}/>

               <h2 className={`${BurgerIngredientsStyles.subtitle} text text_type_main-default`}>Соусы</h2>
               <IngredientContainer arr={sauce}/>
               <h2 className={`${BurgerIngredientsStyles.subtitle} text text_type_main-default`}>Начинки</h2>
               <IngredientContainer arr={main}/>
            </div>
            
        </section>
            
    )
}



const IngredientContainer = ({arr}) => {
   return (
    <div className={BurgerIngredientsStyles.ingredient_container}>
        
        {arr.map(i => {
            return (
                <Ingredient props={i} key={i._id}/>
            )
    })
}
        
  </div>


   )
}
 const Ingredient = ({props}) => {
    return (
        <div className={BurgerIngredientsStyles.ingredient}>
            <img src={props.image} alt={props.name}  />
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
   
   props: PropTypes.arrayOf(ingredientPropType).isRequired
    
  
 }





export default BurgerIngredients