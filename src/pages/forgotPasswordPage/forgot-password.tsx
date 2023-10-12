import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import ForgotPasswordPageStyles from './forgotPasword.module.css'
import { Link, useNavigate } from 'react-router-dom'
import React  from 'react';
import { FC } from "react";
import { forgotPasswordRequest } from '../../utils/api-burger';


export const ForgotPasswordPage : FC = () => {
  const [value, setValue] = React.useState({
       email : '',
})
const navigate = useNavigate()
const onChange = ( e: React.ChangeEvent<HTMLInputElement>) => {

  setValue({...value, [e.target.name] : e.target.value})
}

const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  forgotPasswordRequest(value)
  .then((res) => {
    if(res && res.success) {
      localStorage.setItem('forgotPasswordSuccess', 'true')
    }
  })
  .then(() => {
    navigate('/reset-password')
  })
  .catch(err => {
    console.log(err)
  })
  
}
    return(
    <div className={ForgotPasswordPageStyles.page}>
        <h2 className={`${ForgotPasswordPageStyles.title} text text_type_main-large`}>Восстановление пароля</h2>
        
        <form className={ForgotPasswordPageStyles.form} onSubmit={submitForm}>
        <EmailInput name='email' onChange={onChange} value={value.email}/>
        <div className={ForgotPasswordPageStyles.button}>
        <Button  htmlType="submit"   >Восстановить</Button>
        </div>
        
          
        
        </form>
        
        <p className={ `text text_type_main-default text_color_inactive`}>Вспомнили пароль? <Link to={{pathname:'/login'}} className={`${ForgotPasswordPageStyles.link} `}>Войти</Link></p>

    </div>
    )
}