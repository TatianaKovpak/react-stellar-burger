import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import AppHeaderStyles from './AppHeader.module.css'
import { Link, NavLink, useMatch } from 'react-router-dom'
import { FC } from "react";

const AppHeader: FC = () => {
  const profileMatch = useMatch('/profile')
  const constructorMatch = useMatch('/')
  const feedMatch = useMatch('/feed')
  
  
    return (
        <header className={AppHeaderStyles.header}>
            <nav className={AppHeaderStyles.menu}>
              <NavLink to={{pathname: '/'}}  className={({isActive}) => isActive ? AppHeaderStyles.active : AppHeaderStyles.link }>
              
                <BurgerIcon type={constructorMatch !== null ? 'primary' : 'secondary'}  />
                Конструктор
              </NavLink>
              <NavLink to={'/feed'} className={({isActive}) => isActive ? AppHeaderStyles.active : AppHeaderStyles.link }>
                <ListIcon type={feedMatch !== null ? 'primary' : 'secondary'} />
                Лента заказов
              </NavLink>
            </nav>
            <Link to={{pathname: '/'}}>
            <div className={AppHeaderStyles.logo} ><Logo /></div>
            </Link>
            
            <NavLink to={{pathname: "/profile"}} className={({isActive}) => isActive ? AppHeaderStyles.active : AppHeaderStyles.link }>
              <ProfileIcon type={profileMatch !== null ? 'primary' : 'secondary'}  />
              Личный кабинет
            </NavLink>

        </header>
    
    )
}

export default AppHeader