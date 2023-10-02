import React, {useRef, useMemo, FC, RefObject } from 'react';
import { Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import { ingredientPropType } from '../../utils/prop-types';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from '../../services/types/index';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { OPEN_MODAL_INGREDIENT } from '../../services/actions/modalActions';
import { TArr, TIngredient, IBurgerIngredient } from '../../services/types/data';



const  BurgerIngredients: FC = () => {
    const [currentTab, setCurrentTab] = React.useState<string>('bun')
    const ingredients = useSelector((state) => state.ingredients.ingredients)
    // function useRef<T>(initialValue: T|null): RefObject<T>
 
    
    const refOfTab = useRef<HTMLDivElement>(null)
    const refOfBun= useRef<HTMLHeadingElement | null>(null)
    const refOfSauce = useRef<HTMLHeadingElement | null>(null)
    const refOfMain = useRef<HTMLHeadingElement | null>(null)
    
    type TRef  = {
      current:  HTMLHeadingElement 
    }

    const switchTab = (ref: TRef ) => {
      const current = ref.current
      if(current != null) {
        setTimeout(() => ref.current.scrollIntoView({ block: "start",  behavior: "smooth" }), 100)

      }

           
     }
    
    const scroll = (refOfBun : TRef, refOfSauce : TRef) => {
        if (refOfBun.current.getBoundingClientRect().top >= 0) {
          setCurrentTab('bun')
        } else if (refOfSauce.current.getBoundingClientRect().top >= 0) {
          setCurrentTab('sauce')
        } else {
          setCurrentTab('main')
        }
      }


    let bun: TIngredient[] = []
    let sauce: TIngredient[] = []
    let main: TIngredient[] = []

    useMemo(() => {
      bun = ingredients.filter( i => i.type === 'bun')
      sauce = ingredients.filter( i => i.type === 'sauce')
      main = ingredients.filter(i => i.type === 'main')
    }, [bun, sauce, main, ingredients])
 

    return (
         <section className={BurgerIngredientsStyles.section}>
            <h1 className={`${BurgerIngredientsStyles.title} text text_type_main-large`}>Соберите бургер</h1>
            <div className={BurgerIngredientsStyles.menu}>
                <Tab value='buns' active={currentTab === 'bun'} onClick={() => {switchTab(refOfBun) }}>Булки</Tab>
                <Tab value='sauce' active={currentTab === 'sauce'} onClick={() => {switchTab(refOfSauce) }}>Соусы</Tab>
                <Tab value='main'  active={currentTab === 'main'} onClick={() => {switchTab(refOfMain)}}>Начинки</Tab>
            </div>
            
            <div onScroll={() => scroll(refOfBun, refOfSauce)} className={`custom-scroll ${BurgerIngredientsStyles.scroll}`} ref={refOfTab}>
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

const IngredientContainer: FC<TArr> = ({arr}) => {

   return (
    <div className={BurgerIngredientsStyles.ingredient_container}>
        {arr.map(i => {
            return (
                    <Ingredient  props={i} key={i._id} _id={i._id}/> 
            )   
        })}
    </div>
   )
}

 const Ingredient: FC<IBurgerIngredient> = ({props, _id}) => {
   
   const addedIngredient = useSelector(state => state.ingredients.addedIngredients)
   const counter = useMemo(() => addedIngredient.filter(item => item._id === _id).length, [addedIngredient]) 

    const dispatchModal = useDispatch()
    const location = useLocation()
    
    const [{opacity}, dragRef] = useDrag({
        type: 'ingredient',
        item: {_id, props},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })

    function openPopup () {
        dispatchModal({
            type: OPEN_MODAL_INGREDIENT,
            payload: props
        })
    } 

    return (
        <Link to={{pathname:`/ingredient/:${_id}`}} state={{ background: location }} className={BurgerIngredientsStyles.link}>
        <div className={BurgerIngredientsStyles.ingredient} onClick={() => openPopup()} ref={dragRef} style={{opacity}}>
            <img src={props.image} alt={props.name} />
            <div className={BurgerIngredientsStyles.box} >
               <p className={`${BurgerIngredientsStyles.ingredient__price} text text_type_digits-default`}>{props.price}</p>
               <div className={BurgerIngredientsStyles.ingredient__icon}>
                 <CurrencyIcon type="primary" />
               </div>
            </div>
            <div className={BurgerIngredientsStyles.ingredient__counter}>
              <Counter count={counter} />
            </div>
            <p className={`${BurgerIngredientsStyles.ingredient__title} text text_type_main-default`}>{props.name}</p>
        </div> 
        </Link> 
    )
 }
//  BurgerIngredients.propTypes = {
//     state: PropTypes.object
//  } 

//  Ingredient.propTypes = {
//     props: ingredientPropType,
//     _id: PropTypes.string
//  }

export default BurgerIngredients




