import { Link } from "react-router-dom";
import NotFoundStyles from './notFound.module.css'


export function NotFound404 () {
    return (
        <div className={NotFoundStyles.page} >
        <h2 className={`text text_type_digits-large ${NotFoundStyles.title}`}>404</h2>
        <p className={`text text_type_main-default text_color_inactive`}>Страница не найдена. <Link to={{pathname: '/'}} className={NotFoundStyles.link}>Вернуться на главную страницу</Link></p>
        </div>
    )
}