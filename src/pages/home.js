import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor"
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from '../components/App/App.module.css'

export function HomePage () {
    return (
        <div className={styles.app}>
        
      <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
              <BurgerIngredients /> 
              <BurgerConstructor  />
          </DndProvider>
      </main>
    </div>
 

    )
}