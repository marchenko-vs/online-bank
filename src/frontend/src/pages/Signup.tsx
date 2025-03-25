import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { apiUrl } from "../contexts/ConfigContext";
import './Signup.css';
import { PostUser } from "../models/UserModel";

function getFormValues() {
  const storedValues = localStorage.getItem('signUpFormValues');

  if (!storedValues) {
    return {
      firstName: '',
      lastName: '',
      patronymic: '',
      birthDate: '',
      email: '',
      phoneNum: '',
      password: '',
      country: '',
      region: '',
      city: '',
      addressLine1: '',
      addressLine2: '',
      postalCode: '',
      idType: 'Паспорт гражданина РФ',
      idSeries: '',
      idNumber: '',
      idIssueDate: '',
      idValidityDate: '',
      departmentCode: ''
    };
  }

  return JSON.parse(storedValues);
}

export default function Signup () {
  const [formValues, setFormValues] = useState(getFormValues());
  const [formErr, setFormErr] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("signUpFormValues", JSON.stringify(formValues));
  }, [formValues]);

  function handleChange(event: any) {
    setFormValues((prevFormValues: any) => ({
      ...prevFormValues, [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const userService: UserService = new UserService(apiUrl, '');
    let postUser: PostUser = formValues;

    if (postUser.idValidityDate === "") {
      postUser.idValidityDate = "3000-01-01";
    }

    userService.signup(postUser)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        throw res.status;
      }
    })
    .then(res => {
      navigate('/users/login');
    })
    .catch(err => {
      if (err === 400) {
        setFormErr('Ошибка: введены некорректные данные');
        return;
      }
      else if (err === 409) {
        setFormErr('Ошибка: данная электронная почта занята');
        return;
      }
      else {
        setFormErr('Ошибка: сервер не обработал запрос');
        return;
      }
    });
  }

  return (
    <div className="signup-form">
      <ul>
        <li>
          <h1 className="page-title">Регистрация</h1>
        </li>
        <form onSubmit={handleSubmit}>
        <li>
          <input className="text-box" name="email" value={formValues.email} onChange={handleChange} 
          placeholder="Адрес электронной почты" minLength={3} ></input>
        </li>
        <li>
          <input className="text-box" name="password" value={formValues.password} onChange={handleChange} 
          type="password" placeholder="Пароль" minLength={6} ></input>
        </li>
        <li>
          <input className="text-box" name="lastName" value={formValues.lastName} onChange={handleChange} 
          placeholder="Фамилия" minLength={1} ></input>
        </li>
        <li>
          <input className="text-box" name="firstName" value={formValues.firstName} onChange={handleChange} 
          placeholder="Имя" minLength={1} ></input>
        </li>
        <li>
          <input className="text-box" name="patronymic" value={formValues.patronymic} onChange={handleChange} 
          placeholder="Отчество"></input>
        </li>
        <li>
          <p className="error-message">Дата рождения</p>
        </li>
        <li>
          <input className="date-picker" type="date" name="birthDate" value={formValues.birthDate} onChange={handleChange} ></input>
        </li>
        <li>
          <input className="text-box" name="phoneNum" value={formValues.phoneNum} onChange={handleChange} 
          placeholder="Номер телефона"></input>
        </li>
        <li>
          <h1 className="page-title">Адрес регистрации</h1>
        </li>
        <li>
          <input className="text-box" name="country" value={formValues.country} onChange={handleChange} 
          placeholder="Страна" ></input>
        </li>
        <li>
          <input className="text-box" name="region" value={formValues.region} onChange={handleChange} 
          placeholder="Регион" ></input>
        </li>
        <li>
          <input className="text-box" name="city" value={formValues.city} onChange={handleChange} 
          placeholder="Город"></input>
        </li>
        <li>
          <input className="text-box" name="addressLine1" value={formValues.addressLine1} onChange={handleChange} 
          placeholder="Адрес" minLength={1} maxLength={128} ></input>
        </li>
        <li>
          <input className="text-box" name="setAddressLine2" value={formValues.addressLine2} onChange={handleChange} 
          placeholder="Адрес"></input>
        </li>
        <li>
          <input className="text-box" name="postalCode" value={formValues.postalCode} onChange={handleChange} 
          placeholder="Почтовый индекс" minLength={1} ></input>
        </li>
        <li>
          <h1 className="page-title">Паспортные данные</h1>
        </li>
        <li>
          <select className="select-box"  name="idType" 
            value={formValues.idType} onChange={handleChange} >
            <option>Паспорт гражданина РФ</option>
            <option>Паспорт иностранного гражданина</option>
          </select>
        </li>
        <li>
          <input className="text-box" name="idSeries" value={formValues.idSeries} onChange={handleChange}  
          placeholder="Серия документа"></input>
        </li>
        <li>
          <input className="text-box" name="idNumber" value={formValues.idNumber} onChange={handleChange}  
          placeholder="Номер документа" minLength={1} ></input>
        </li>
        <li>
          <p className="error-message">Дата выдачи</p>
        </li>
        <li>
          <input className="date-picker" type="date" name="idIssueDate" value={formValues.idIssueDate} onChange={handleChange}></input>
        </li>
        <li>
          <p className="error-message">Срок действия</p>
        </li>
        <li>
          <input className="date-picker" type="date" name="idValidityDate" value={formValues.idValidityDate} onChange={handleChange}></input>
        </li>
        <li>
          <input className="text-box" name="departmentCode" value={formValues.departmentCode} onChange={handleChange} 
          placeholder="Код подразделения" minLength={1} ></input>
        </li>
        <li>
          <button className="big-button" type="submit">Зарегистрироваться</button>
        </li>
        </form>
        <li>
          {formErr === '' ? <></> : <p className="error-message">{formErr}</p>}
        </li>
      </ul>
    </div>
  )
}
