import styles from "./App.module.css";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useEffect, useState, useContext, useReducer } from "react";
import {getIngredients} from "../../utils/api-burger";
import { IngredientApiContext, IngredientContext } from "../../services/ingredientContext";


function App() {
 const [addedIngredient, setAddedIngredient] = useState([])

console.log(addedIngredient)

  const [ingredients, setIngredients] = useState([])
  

  const state = {}

  useEffect(async () => {
      getIngredients()
      .then(data => setIngredients(data.data))
      .catch(e => console.log(e))
      
  }, [])

  return (
      <div className={styles.app}>
        <AppHeader/>
      <main className={styles.main}>
      
        <IngredientApiContext.Provider value={{ingredients, setIngredients}}>
          <IngredientContext.Provider value={{addedIngredient, setAddedIngredient}}>
            <BurgerIngredients state={state} /> 
            <BurgerConstructor state={state} />
          </IngredientContext.Provider>
        </IngredientApiContext.Provider>
        
      </main>
      
  
    </div>
  );
}

export default App;
