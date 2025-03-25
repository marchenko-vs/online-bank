import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import UserService from "../services/UserService";
import { apiUrl } from "../contexts/ConfigContext";
import './Login.css';
import { LoginUser } from "../models/UserModel";
import { PassThrough } from "stream";

function getFormValues() {
  const storedValues = localStorage.getItem('loginFormValues');

  if (!storedValues) {
    return {
      email: '',
      password: ''
    };
  }

  return JSON.parse(storedValues);
}

export default function Login () {
  const authContext = useContext(AuthContext);

  const [formValues, setFormValues] = useState(getFormValues());
  const [formErr, setFormErr] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("loginFormValues", JSON.stringify(formValues));
  }, [formValues]);

  function handleChange(event: any) {
    setFormValues((prevFormValues: any) => ({
      ...prevFormValues, [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const userService: UserService = new UserService(apiUrl, '');
    let loginUser: LoginUser = formValues;

    userService.login(loginUser)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        throw res.status;
      }
    })
    .then(res => {
      localStorage.setItem('jwt', res.jwt);
      authContext.setIsLoggedIn(true);
      navigate('/accounts/me');
    })
    .catch(err => {
      if (err === 400) {
        setFormErr('Ошибка: введен неверный пароль');
        return;
      }
      else if (err === 404) {
        setFormErr('Ошибка: пользователь с данной электронной почтой не зарегистрирован');
        return;
      }
      else {
        setFormErr('Ошибка: сервер не обработал запрос');
        return;
      }
    });
  }
  
  return (
  <div className="body-content">
    <div className="login-form">
      <ul>
        <form onSubmit={handleSubmit}>
          <li>
            <h1 className="page-title">Вход</h1>
          </li>
          <li><input className="text-box" name="email" value={formValues.email} onChange={handleChange}
            minLength={3} placeholder="Адрес электронной почты" required></input></li>
          <li><input className="text-box" name="password" value={formValues.password} onChange={handleChange} 
            minLength={6} type="password" placeholder="Пароль" required></input></li>
          <li><button className="big-button" type="submit">Войти</button></li>
          <li>
            {formErr === '' ? <></> : <p className="error-message">{formErr}</p>}
          </li>
        </form>
      </ul>
    </div>
  </div>
  )
}
