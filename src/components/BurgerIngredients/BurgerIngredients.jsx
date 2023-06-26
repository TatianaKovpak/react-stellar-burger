import React, { useCallback, useEffect, useRef } from 'react';
import { Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsFromServer } from '../../services/actions/actions';
import { useDrag } from 'react-dnd';
import uuid from 'react-uuid';

const key=uuid()


function BurgerIngredients () {
    const [currentTab, setCurrentTab] = React.useState('bun')
    const ingredients = useSelector((state) => state.burgerIngredients.ingredients)

    const refOfTab = useRef(currentTab)
    const refOfBun = useRef(null)
    const refOfSauce = useRef(null)
    const refOfMain = useRef(null)

    const switchTab = (ref) => {
            setTimeout(() => ref.current.scrollIntoView({ block: "start", behavior: "smooth" }), 100)
     }
    
    const scroll = () => {
        if (refOfBun.current.getBoundingClientRect().top >= 0) {
          setCurrentTab('bun')
        } else if (refOfSauce.current.getBoundingClientRect().top >= 0) {
          setCurrentTab('sauce')
        } else {
          setCurrentTab('main')
        }
      }

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getIngredientsFromServer())
    }, [dispatch])
 

    const bun = ingredients.filter( i => i.type === 'bun');
    const sauce = ingredients.filter( i => i.type === 'sauce');
    const main = ingredients.filter(i => i.type === 'main')

    return (
         <section className={BurgerIngredientsStyles.section}>
           
            <h1 className={`${BurgerIngredientsStyles.title} text text_type_main-large`}>Соберите бургер</h1>
            <div className={BurgerIngredientsStyles.menu}>
                <Tab className="text text_type_main-default" active={currentTab === 'bun'} onClick={() => {switchTab(refOfBun); setCurrentTab()}}>Булки</Tab>
                <Tab className="text text_type_main-default" active={currentTab === 'sauce'} onClick={() => {switchTab(refOfSauce); setCurrentTab()}}>Соусы</Tab>
                <Tab className="text text_type_main-default" active={currentTab === 'main'} onClick={() => {switchTab(refOfMain); setCurrentTab()}}>Начинки</Tab>
            </div>
            
            <div onScroll={scroll} className={`custom-scroll ${BurgerIngredientsStyles.scroll}`} ref={refOfTab}>
              
                 <h2 className={`${BurgerIngredientsStyles.subtitle} text text_type_main-default`} ref={refOfBun}>Булки</h2>
                 <IngredientContainer  arr={bun} />
                 <h2 className={`${BurgerIngredientsStyles.subtitle} text text_type_main-default`} ref={refOfSauce}>Соусы</h2>
                 <IngredientContainer  arr={sauce} />
                 <h2 className={`${BurgerIngredientsStyles.subtitle} text text_type_main-default`} ref={refOfMain}>Начинки</h2>
                 <IngredientContainer  arr={main} />
            </div>     
            
        </section>       
    )
}

const IngredientContainer = ({arr}) => {

   return (
    <div className={BurgerIngredientsStyles.ingredient_container}>
        {arr.map(i => {
            i.board = 'default' 
            i.key = key
            return (
                    <Ingredient  props={i} key={i.key} _id={i._id}/> 
            )   
        })}
    </div>
   )
}

 const Ingredient = ({props, _id}) => {
   /* const addedIngredient = useSelector(state => state.burgerIngredients.addedIngredients)*/
    const dispatch = useDispatch()
   

    
    const [{opacity}, dragRef] = useDrag({
        type: 'ingredient',
        item: {_id},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })
  
    /*function findBun (arr) {
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
      }*/

    function addIngredient (type) {
        dispatch({
            type: 'OPEN_MODAL_INGREDIENT',
            propsBtn: props
        })
         

        /*if(type === 'bun' && findBun(addedIngredient)){
            changeBun(addedIngredient)
             return
        }
        else {
            addedIngredient.push(props)
        }*/
    } 
    return (
       
        
        <div className={BurgerIngredientsStyles.ingredient} onClick={() => addIngredient(props.type)} ref={dragRef} style={{opacity}}>
            
            <img src={props.image} alt={props.name} />
            <div className={BurgerIngredientsStyles.box} >
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
 BurgerIngredients.propTypes = {
    state: PropTypes.object
 } 

 /*Ingredient.propTypes = {
    props: ingredientPropType
 }*/

export default BurgerIngredients




