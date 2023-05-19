import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeaderStyles from './AppHeader.module.css'

function AppHeader () {
    return (
        <header className={AppHeaderStyles.header}>
            <nav className={AppHeaderStyles.menu}>
              <a href="" className={AppHeaderStyles.link}>
                <BurgerIcon type="primary"/>
                <p className={`${AppHeaderStyles.title } text text_type_main-default `}>Конструктор</p> 
              </a>
              <a href="" className={AppHeaderStyles.link}>
                <ListIcon type="secondary" />
                <p className={`${AppHeaderStyles.title } text text_type_main-default text_color_inactive`}>Лента заказов</p>
              </a>
            </nav>
            <div className={AppHeaderStyles.logo}><Logo /></div>
            
            <a href="" className={AppHeaderStyles.link}>
              <ProfileIcon type="secondary" />
              <p className={`${AppHeaderStyles.title } text text_type_main-default text_color_inactive`}>Личный кабинет</p> 
            </a>

           
            
        </header>
    
    )
}



export default AppHeader