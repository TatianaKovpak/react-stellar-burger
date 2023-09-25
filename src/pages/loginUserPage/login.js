import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link} from "react-router-dom"
import LoginPageStyles from "./login.module.css"
import React, { useEffect } from 'react';
import { userAuthorization } from "../../services/actions/userActions";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../services/actions/modalActions";



export function LoginPage () {
  const dispatch = useDispatch()
  const [value, setValue] = React.useState({
    email : '',
    password : ''
})

const onChange = (e) => {
    setValue({...value, [e.target.name] : e.target.value})
}

const submitForm = (e) => {
  e.preventDefault();
  dispatch(userAuthorization(value))
  
  
}

useEffect(() => {
  dispatch({
    type: CLOSE_MODAL
})
}, [dispatch])



    return (
      <div className={LoginPageStyles.page}>

        <h2 className={`${LoginPageStyles.title} text text_type_main-large`}>Вход</h2>
        <form className={LoginPageStyles.form} onSubmit={submitForm}>
        <EmailInput name='email' isIcon={false} onChange={onChange} value={value.email} />
        <PasswordInput name='password' onChange={onChange} value={value.password}/>
        
 
        <div className={LoginPageStyles.button}>
          <Button htmlType="submit" type="primary" size="large" >Войти</Button>
          </div>

        </form>
        <h2 className={`${LoginPageStyles.link__title} text text_type_main-default text_color_inactive`}>Вы новый пользователь? <Link to={{pathname:"/register"}} className={LoginPageStyles.link}>Зарегистрироваться</Link> </h2>
        <h2 className={`${LoginPageStyles.link__title} text text_type_main-default text_color_inactive`}>Забыли пароль? <Link to={{pathname:"/forgot-password"}} className={LoginPageStyles.link}>Восстановить пароль</Link></h2>
       </div>
    )

}