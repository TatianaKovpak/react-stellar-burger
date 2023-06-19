import React from 'react';
import { Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from "prop-types";
import { IngredientApiContext, IngredientContext } from '../../services/ingredientContext';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsFromServer } from '../../services/actions/actions';



function BurgerIngredients ({state}) {
    /*const {ingredients} = React.useContext(IngredientApiContext)*/
    const {addedIngredient} = React.useContext(IngredientContext)
    const {ingredients} = useSelector((state) => state.ingredients)

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getIngredientsFromServer())
    }, [])

    console.log(ingredients)
    

    /*const bun = reduxIngredients.filter( i => i.type === 'bun');
    const sauce = reduxIngredients.filter( i => i.type === 'sauce');
    const main = reduxIngredients.filter(i => i.type === 'main')*/


    const bun = ingredients.filter( i => i.type === 'bun');
    const sauce = ingredients.filter( i => i.type === 'sauce');
    const main = ingredients.filter(i => i.type === 'main')

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
                 <IngredientContainer state={state} arr={bun} addedIngredient={addedIngredient}/>
                 <h2 className={`${BurgerIngredientsStyles.subtitle} text text_type_main-default`}>Соусы</h2>
                 <IngredientContainer state={state} arr={sauce} addedIngredient={addedIngredient}/>
                 <h2 className={`${BurgerIngredientsStyles.subtitle} text text_type_main-default`}>Начинки</h2>
                 <IngredientContainer state={state} arr={main} addedIngredient={addedIngredient}/>
            </div>     
            
        </section>       
    )
}

const IngredientContainer = ({arr, state}) => {
   return (
    <div className={BurgerIngredientsStyles.ingredient_container}>
        {arr.map(i => {
            return (
             <Ingredient state={state} props={i} key={i._id} /> 
            )   
        })}
    </div>
   )
}

 const Ingredient = ({props, state}) => {

    const {addedIngredient} = React.useContext(IngredientContext)

    function editModalWindow () {
        state.setModalProp({
            btn: 'ingredient',
            props : props
        })
        state.setModalActive(true)
    }

    function findBun (arr) {
        if(
        arr.find(i => i.type === 'bun')
        ) return true

      }

      function changeBun (arr) {

       const bun = arr.find(i => i.type === 'bun') 
       const index = arr.indexOf(bun)
       
       if (index >= 0) {
       arr.splice(index, 1)
       }
       arr.push(props)
    
      }

    function addIngredient (type) {
           editModalWindow()
        if(type === 'bun' && findBun(addedIngredient)){
            changeBun(addedIngredient)
             return
        }
        
        else {
            addedIngredient.push(props)
        }
    } 
    return (
        <>
        <div className={BurgerIngredientsStyles.ingredient} onClick={() => addIngredient(props.type)} >
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
        </>
    )
 }
 BurgerIngredients.propTypes = {
    state: PropTypes.object
 } 

 Ingredient.propTypes = {
    props: ingredientPropType
 }

export default BurgerIngredients