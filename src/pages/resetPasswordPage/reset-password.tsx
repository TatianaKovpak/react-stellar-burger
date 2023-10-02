import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import ResetPasswordPageStyles from './resetPassword.module.css'
import { Link, Navigate,} from 'react-router-dom'
import React from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../services/actions/userActions';
import { FC } from "react";

export const ResetPasswordPage: FC = () => {
 
    const [value, setValue] = React.useState({
        password: '',
        token : '',
 })
 
 const dispatch = useDispatch()
 const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   setValue({...value, [e.target.name] : e.target.value})
 }
 const submitForm = (e:React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetPassword(value))
  }
  
  const isForgotPasswordSuccess = localStorage.getItem('forgotPasswordSuccess')

  if(isForgotPasswordSuccess === null ) {
    return <Navigate to = '/' />
  }

  

    return (
        <div className={ResetPasswordPageStyles.page}>
            <h2 className={`${ResetPasswordPageStyles.title} text text_type_main-large`}>Восстановление пароля</h2>
            <form className={ResetPasswordPageStyles.form} onSubmit={submitForm}>
            <PasswordInput onChange={onChange} value={value.password} name='password'/>
            <Input onChange={onChange} placeholder={'Введите код из письма'} value={value.token} name='token'/>
              <div className={ResetPasswordPageStyles.button}>
              <Button htmlType="submit">Сохранить</Button>
              </div>
            </form>
            <p className={ `text text_type_main-default text_color_inactive`}>Вспомнили пароль? <Link to={{pathname:'/login'}} className={`${ResetPasswordPageStyles.link} `}>Войти</Link></p>
        </div>
    )
}