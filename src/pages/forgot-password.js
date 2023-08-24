import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import ForgotPasswordPageStyles from './forgotPasword.module.css'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../services/actions/userActions'
import React from 'react';
import { useDispatch } from 'react-redux';


export function ForgotPasswordPage() {
  const [value, setValue] = React.useState({
       email : '',
})

const dispatch = useDispatch()
const onChange = (e) => {
  setValue({...value, [e.target.name] : e.target.value})
}

const submitForm = (e) => {
  dispatch(forgotPassword(value))
}
    return(
    <div className={ForgotPasswordPageStyles.page}>
        <h2 className={`${ForgotPasswordPageStyles.title} text text_type_main-large`}>Восстановление пароля</h2>
        <EmailInput name='email' onChange={onChange} value={value.email}/>
        <Link to={{pathname:"/reset-password"}} className={ForgotPasswordPageStyles.button} >
          <Button htmlType="button" onClick={submitForm}  >Восстановить</Button>
        </Link>
        <p className={ `text text_type_main-default text_color_inactive`}>Вспомнили пароль? <Link to={{pathname:'/login'}} className={`${ForgotPasswordPageStyles.link} `}>Войти</Link></p>

    </div>
    )
}