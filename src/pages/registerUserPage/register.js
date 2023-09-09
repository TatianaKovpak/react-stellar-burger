import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import RegisterPageStyles from "./register.module.css"
import { Link } from "react-router-dom";
import { userRegistration } from "../../services/actions/userActions";
import { useDispatch } from "react-redux";
import React from "react";


export function RegisterPage () {
    const dispatch = useDispatch()
    const [value, setValue] = React.useState({
        name : '',
        email : '',
        password : ''
    })

    const onChange = (e) => {
        setValue({...value, [e.target.name] : e.target.value})
    }

    const submitForm = (e) => {
        e.preventDefault()
        dispatch(userRegistration(value))
    }
    
   
    return (
        <div className={RegisterPageStyles.page}>
            
            <h2 className={`${RegisterPageStyles.title} text text_type_main-large`}>Регистрация</h2>
            <Input placeholder={'Имя'} onChange={onChange} name="name" value={value.name}/>
            <EmailInput onChange={onChange} value={value.email} name="email"/>
            <PasswordInput onChange={onChange} name="password" value={value.password}/>
            <Link to={{pathname: '/'}} className={RegisterPageStyles.button}>
            <Button htmlType="button" onClick={submitForm }>Зарегистрироваться</Button>
            </Link>
            <h2 className={`${RegisterPageStyles.link__title} text text_type_main-default text_color_inactive`}>Уже зарегистрированы? <Link to={{pathname: "/login"}} className={RegisterPageStyles.link}>Войти</Link></h2>
        </div>
    )
}