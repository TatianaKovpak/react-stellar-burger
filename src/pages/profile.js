import { Link, NavLink } from 'react-router-dom';
import ProfilePageStyles from './profile.module.css'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {logoutAction, refreshUserData } from '../services/actions/userActions';


export function ProfilePage () {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
   
  const [value, setValue] = React.useState({
    name : user.name,
    email : user.email,
    password : ''
})

const clearValue = () => {
  setValue({name: user.name, email: user.email, password: ''})
}
const onChange = (e) => {
  setValue({...value, [e.target.name] : e.target.value})
}

const submitForm = () => {
      dispatch(refreshUserData(value))
}

const logout = () => {
    dispatch(logoutAction())
  }


    return (
        <div className={ProfilePageStyles.page}>
          <div className={ProfilePageStyles.navigate}>
           <NavLink to={{pathname: '/profile'}} className={ (({isActive}) => isActive ? ProfilePageStyles.active : ProfilePageStyles.link)}>Профиль</NavLink>
           <NavLink to={{pathname: '/profile/orders'}} className={ (({isActive}) => isActive ? ProfilePageStyles.active : ProfilePageStyles.link)}>История заказов</NavLink>
            <Link to={{pathname: `/login`}} className={`${ProfilePageStyles.link} text text_type_main-medium`} onClick={() => logout()}>Выход</Link>
           <p className={`${ProfilePageStyles.text} text text_type_main-small text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
          </div>
          <div className={ProfilePageStyles.inputs}>
            <Input onChange={onChange} name="name" value={value.name} placeholder='Имя'/>
            <EmailInput onChange={onChange} value={value.email} name="email" placeholder='Логин'/>
            <PasswordInput onChange={onChange} name="password" value={value.password} placeholder='Пароль' />
            <div className={ProfilePageStyles.buttons}>
              <Button htmlType="button" type="secondary" size="small" onClick={() => clearValue()}>Отмена</Button>
              <Button htmlType="button" type="primary" size="small" extraClass="ml-2" onClick={() => submitForm()}>Сохранить</Button>
            </div>
          </div>
        </div>
    )
}