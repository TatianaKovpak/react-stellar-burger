import styles from "./App.module.css";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useEffect, useState} from "react";
import { IngredientApiContext, IngredientContext } from "../../services/ingredientContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";



function App() {
  const [addedIngredient, setAddedIngredient] = useState([])


  

  

  return (
    <div className={styles.app}>

        <AppHeader/>
      <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
              <BurgerIngredients /> 
              
              <BurgerConstructor  />
              
          </DndProvider>
      </main>
    </div>
  );
}

export default App;
