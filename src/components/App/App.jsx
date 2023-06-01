import styles from "./App.module.css";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useEffect, useState } from "react";
import {getIngredients} from "../../utils/api-burger";


const url = 'https://norma.nomoreparties.space/api/ingredients';


function App() {
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
        <BurgerIngredients state={state} ingredientsApi={ingredients}/>
        <BurgerConstructor state={state} ingredientsApi={ingredients}/>
        
      </main>
      
  
    </div>
  );
}

export default App;
