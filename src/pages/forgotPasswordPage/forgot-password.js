import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import ForgotPasswordPageStyles from './forgotPasword.module.css'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react';
/*import { useDispatch } from 'react-redux';*/
import { forgotPasswordRequest } from '../../utils/api-burger';


export function ForgotPasswordPage() {
  const [value, setValue] = React.useState({
       email : '',
})
const navigate = useNavigate()
/*const dispatch = useDispatch()*/
const onChange = (e) => {
  setValue({...value, [e.target.name] : e.target.value})
}

const submitForm = (e) => {
  /*dispatch(forgotPassword(value))*/
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
        <EmailInput name='email' onChange={onChange} value={value.email}/>
        <Link /*to={{pathname:"/reset-password"}}*/ className={ForgotPasswordPageStyles.button} >
          <Button htmlType="button" onClick={submitForm}  >Восстановить</Button>
        </Link>
        <p className={ `text text_type_main-default text_color_inactive`}>Вспомнили пароль? <Link to={{pathname:'/login'}} className={`${ForgotPasswordPageStyles.link} `}>Войти</Link></p>

    </div>
    )
}