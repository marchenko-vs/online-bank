import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import UserService from "../services/UserService";
import { apiUrl } from "../contexts/ConfigContext";
import useGetProfile from "../hooks/useGetProfile";
import { PatchUser } from "../models/UserModel";
import './Settings.css';

function getFormValues() {
  const storedValues = localStorage.getItem('settingsFormValues');

  if (!storedValues) {
    return {
      firstName: '',
      lastName: '',
      patronymic: '',
      birthDate: '',
      email: '',
      phoneNum: '',
      oldPassword: '',
      newPassword: '',
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

export default function Settings () {
  const [user, setUser] = useGetProfile(apiUrl, localStorage.getItem('jwt')!);
  const [formValues, setFormValues] = useState(getFormValues());
  const [formErr, setFormErr] = useState('');

  useEffect(() => {
      localStorage.setItem("settingsFormValues", JSON.stringify(formValues));
    }, [formValues]);

  function handleChange(event: any) {
    setFormValues((prevFormValues: any) => ({
      ...prevFormValues, [event.target.name]: event.target.value,
    }));
  }

  const submitSettings = (e: any) => {
    e.preventDefault();

    const userService: UserService = new UserService(apiUrl, localStorage.getItem('jwt')!);
    let patchUser: PatchUser = formValues;

    userService.changeSettings(patchUser)
    .then(res => {
      if (res.ok) {
        setFormErr('Данные успешно обновлены');
        return res.json();
      }
      else {
        throw res.status;
      }
    })
    .catch(err => {
      if (err === 409) {
        setFormErr('Ошибка: адрес электронной почты уже используется');
        return;
      }
      else {
        setFormErr('Ошибка сервера');
        return;
      }
    });
  }
  
  return (
    <div className="settings-form">
      <ul>
        <h1 className="page-title">Настройки</h1>
        <form onSubmit={submitSettings}>
        <li>
          <input className="text-box" name="email" value={formValues.email} onChange={handleChange}
          placeholder={user?.email} minLength={3}></input>
        </li>
        <li>
          <input className="text-box" name="password" value={formValues.oldPassword} onChange={handleChange}
          type="password" placeholder="Текущий пароль" minLength={6} required></input>
        </li>
        <li>
          <input className="text-box" name="password" value={formValues.newPassword} onChange={handleChange}
          type="password" placeholder="Новый пароль" minLength={6}></input>
        </li>
        <li>
          <input className="text-box" name="lastName" value={formValues.lastName} onChange={handleChange}
          placeholder={user?.lastName} minLength={1}></input>
        </li>
        <li>
          <input className="text-box" name="firstName" value={formValues.firstName} onChange={handleChange}
          placeholder={user?.firstName} minLength={1}></input>
        </li>
        <li>
          <input className="text-box" name="patronymic" value={formValues.patronymic} onChange={handleChange}
          placeholder={user?.patronymic == null || user?.patronymic == "" ? "Отчество" : user?.patronymic}></input>
        </li>
        <li>
          <p className="error-message">Дата рождения</p>
        </li>
        <li>
          <input className="date-picker" type="date" name="birthDate" value={formValues.birthDate} 
            onChange={handleChange}></input>
        </li>
        <li>
          <input className="text-box" name="phoneNum" value={formValues.phoneNum} onChange={handleChange}
          placeholder={user?.phoneNum == null || user?.phoneNum == "" ? "Номер телефона" : user?.phoneNum}></input>
        </li>
        <li>
          <h1 className="page-title">Адрес регистрации</h1>
        </li>
        <li>
          <input className="text-box" name="country" value={formValues.country} onChange={handleChange}
          placeholder={user?.country}></input>
        </li>
        <li>
          <input className="text-box" name="region" value={formValues.region} onChange={handleChange}
          placeholder={user?.region}></input>
        </li>
        <li>
          <input className="text-box" name="city" value={formValues.city} onChange={handleChange}
          placeholder={user?.city == null || user?.city == "" ? "Город" : user?.city}></input>
        </li>
        <li>
          <input className="text-box" name="addressLine1" value={formValues.addressLine1} onChange={handleChange}
          placeholder={user?.addressLine1} maxLength={128}></input>
        </li>
        <li>
          <input className="text-box" name="setAddressLine2" value={formValues.addressLine2} onChange={handleChange}
          placeholder={user?.addressLine2 == null || user?.addressLine2 == "" ? "Адрес" : user?.addressLine2} maxLength={128}></input>
        </li>
        <li>
          <input className="text-box" name="postalCode" value={formValues.postalCode} onChange={handleChange}
          placeholder={user?.postalCode}></input>
        </li>
        <li>
          <h1 className="page-title">Паспортные данные</h1>
        </li>
        <li>
          <select className="select-box" name="idType" 
            value={formValues.idType} onChange={handleChange}>
            <option>Паспорт гражданина РФ</option>
            <option>Паспорт иностранного гражданина</option>
          </select>
        </li>
        <li>
          <input className="text-box" name="idSeries" value={formValues.idSeries} onChange={handleChange}
          placeholder={user?.idSeries == null || user?.idSeries == "" ? "Серия документа" : user?.idSeries}></input>
        </li>
        <li>
          <input className="text-box" name="idNumber" value={formValues.idNumber} onChange={handleChange}
          placeholder={user?.idNumber}></input>
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
          placeholder={user?.departmentCode} minLength={1} required></input>
        </li>
        <li>
          <button className="big-button" type="submit">Подтвердить изменения</button>
        </li>
        </form>
        <li>
          {formErr === '' ? <></> : <p className="error-message">{formErr}</p>}
        </li>
      </ul>
    </div>
  )
}
