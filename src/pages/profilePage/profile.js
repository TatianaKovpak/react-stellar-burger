import { Link, NavLink, useLocation } from 'react-router-dom';
import ProfilePageStyles from './profile.module.css'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {logoutAction, refreshUserData } from '../../services/actions/userActions';
import Order from '../../components/Order/Order';
import { connect, disconnect } from '../../services/actions/socketMiddlewareActions';


export function ProfilePage () {
  const user = useSelector((state) => state.user.user)
  const allOrders = useSelector(state => state.orders.allOrders)
  const dispatch = useDispatch()
  const location = useLocation()
  const token = localStorage.getItem('accessToken').replace('Bearer ', '')
  const url = `wss://norma.nomoreparties.space/orders?token=${token}`

  let key
   
  const [value, setValue] = React.useState({
    name : user.name,
    email : user.email,
    password : ''
})

useEffect(() => {
  dispatch(connect(url))

  return (() => {
    dispatch(disconnect())

})
}, [dispatch, token])



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

  if(allOrders.orders) {
    allOrders.orders.reverse()
    key = allOrders.orders.map(i => i.number)
    
  }


    return (
        <div className={ProfilePageStyles.page}>
          <div className={ProfilePageStyles.navigate}>
           <NavLink to={{pathname: '/profile'}} className={ location.pathname.includes('/orders') ? ProfilePageStyles.link : ProfilePageStyles.active}>Профиль</NavLink>
           <NavLink to={{pathname: '/profile/orders'}} className={ location.pathname.includes('/orders') ? ProfilePageStyles.active : ProfilePageStyles.link}>История заказов</NavLink>
            <Link to={{pathname: `/login`}} className={`${ProfilePageStyles.link} text text_type_main-medium`} onClick={() => logout()}>Выход</Link>
           <p className={`${ProfilePageStyles.text} text text_type_main-small text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
          </div>
          {location.pathname === '/profile' ? 
          <div className={ProfilePageStyles.inputs}>
            <Input onChange={onChange} name="name" value={value.name} placeholder='Имя'/>
            <EmailInput onChange={onChange} value={value.email} name="email" placeholder='Логин'/>
            <PasswordInput onChange={onChange} name="password" value={value.password} placeholder='Пароль' />
            <div className={ProfilePageStyles.buttons}>
              <Button htmlType="button" type="secondary" size="small" onClick={() => clearValue()}>Отмена</Button>
              <Button htmlType="button" type="primary" size="small" extraClass="ml-2" onClick={() => submitForm()}>Сохранить</Button>
            </div>
          </div> 
          :
          <div className={ProfilePageStyles.inputs}>
          <div className={`custom-scroll ${ProfilePageStyles.scroll} `}>
              <Order allOrders={allOrders}/>
          </div>
          </div>
}
        </div>
    )
}