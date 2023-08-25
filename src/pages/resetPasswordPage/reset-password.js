import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import ResetPasswordPageStyles from './resetPassword.module.css'
import { Link, Navigate,} from 'react-router-dom'
import React from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../services/actions/userActions';

export function ResetPasswordPage () {
 
    const [value, setValue] = React.useState({
        password: '',
        token : '',
 })
 
 const dispatch = useDispatch()
 const onChange = (e) => {
   setValue({...value, [e.target.name] : e.target.value})
 }
 const submitForm = (e) => {
    dispatch(resetPassword(value))
  }
  
  const isForgotPasswordSuccess = localStorage.getItem('forgotPasswordSuccess')

  if(isForgotPasswordSuccess === null ) {
    return <Navigate to = '/' />
  }

  

    return (
        <div className={ResetPasswordPageStyles.page}>
            <h2 className={`${ResetPasswordPageStyles.title} text text_type_main-large`}>Восстановление пароля</h2>
            <PasswordInput onChange={onChange} value={value.password} name='password'/>
            <Input onChange={onChange} placeholder={'Введите код из письма'} value={value.token} name='token'/>
            <Link  className={ResetPasswordPageStyles.button}>
              <Button htmlType="button" onClick={() => submitForm()}>Сохранить</Button>
            </Link>
            <p className={ `text text_type_main-default text_color_inactive`}>Вспомнили пароль? <Link to={{pathname:'/login'}} className={`${ResetPasswordPageStyles.link} `}>Войти</Link></p>
        </div>
    )
}