import styles from "./App.module.css";
import { data } from "../../utils/data";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";


function App() {
  
  return (
    
    <div className={styles.app}>
      

      <AppHeader/>
      <main className={styles.main}>
        <BurgerIngredients props={data}/>
        <BurgerConstructor props={data}/>
      </main>
      
  
    </div>
  );
}

export default App;
