import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import RegisterPageStyles from "./register.module.css"
import { Link} from "react-router-dom";
import { userRegistration } from "../../services/actions/userActions";
import { useDispatch } from "../../services/types/index";
import React from "react";
import { FC } from "react";


export const RegisterPage: FC = () => {
    const dispatch = useDispatch()
    const [value, setValue] = React.useState({
        name : '',
        email : '',
        password : ''
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({...value, [e.target.name] : e.target.value})
    }

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(userRegistration(value))
        
    }
    
   
    return (
        <div className={RegisterPageStyles.page}>
            <h2 className={`${RegisterPageStyles.title} text text_type_main-large`}>Регистрация</h2>
            <form className={RegisterPageStyles.form} onSubmit={submitForm}>
            <Input placeholder={'Имя'} onChange={onChange} name="name" value={value.name}/>
            <EmailInput onChange={onChange} value={value.email} name="email"/>
            <PasswordInput onChange={onChange} name="password" value={value.password}/>
             {value.name && value.email && value.password !== '' ? 
            <Link to={{pathname:'/login'}} className={RegisterPageStyles.button}>
            <Button htmlType="submit" >Зарегистрироваться</Button>
            </Link>
          :
          <Button htmlType="submit" >Зарегистрироваться</Button>
             }
            </form>
            <h2 className={`${RegisterPageStyles.link__title} text text_type_main-default text_color_inactive`}>Уже зарегистрированы? <Link to={{pathname: "/login"}} className={RegisterPageStyles.link}>Войти</Link></h2>
        </div>
    )
}