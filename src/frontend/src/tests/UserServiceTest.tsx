import UserService from '../services/UserService';
import { expect } from '@jest/globals';
import { apiUrl } from '../contexts/ConfigContext';
import PostUser, { LoginUser, PatchUser } from '../models/UserModel';

describe('Test UserService class', () => {
  const userService: UserService = new UserService(apiUrl, '');
  
  it('Test 1: login for non-existing user', async () => {
    const loginData: LoginUser = {
        email: "non-existing-user@mail.ru",
        password: "password"
    };

    return await userService.login(loginData)
             .then(res => {
              expect(res.status).toBe(404);
            });
  });

  it('Test 2: login with incorrect data', async () => {
    const loginData: LoginUser = {
        email: "dykhal@mail.ru",
        password: "password"
    };

    return await userService.login(loginData)
             .then(res => {
              expect(res.status).toBe(400);
            });
  });

  it('Test 3: login with correct data', async () => {
    const loginData: LoginUser = {
        email: "dykhal@mail.ru",
        password: "123456"
    };

    return await userService.login(loginData)
             .then(res => {
                expect(res.status).toBe(200);
                return res.json();
            })
            .then(res => expect(res).toHaveProperty('jwt'));
  });

  it('Test 4: sign up with busy email', async () => {
    const signupData: PostUser = {
      firstName: "Полина",
      lastName: "Дыхал",
      patronymic: null,
      birthDate: "2002-08-01T00:00:00.000Z",
      email: "dykhal@mail.ru",
      phoneNum: null,
      password: "123456",
      country: "Российская Федерация",
      region: "Московская область",
      city: null,
      addressLine1: "ул. Какая-то, д. 1, кв. 2",
      addressLine2: null,
      postalCode: "156723",
      idType: "Паспорт гражданина РФ",
      idSeries: null,
      idNumber: "123456",
      idIssueDate: "2018-05-25T00:00:00.000Z",
      idValidityDate: "3000-01-01T00:00:00.000Z",
      departmentCode: "123-456"
    };

    return await userService.signup(signupData)
             .then(res => {
                expect(res.status).toBe(409);
            });
  });

  it('Test 5: sign up successfully', async () => {
    const signupData: PostUser = {
      firstName: "Тестовый",
      lastName: "Пользователь",
      patronymic: null,
      birthDate: "2000-01-01T00:00:00.000Z",
      email: "test-user@gmail.com",
      phoneNum: null,
      password: "111111",
      country: "Российская Федерация",
      region: "Московская область",
      city: null,
      addressLine1: "ул. Какая-то, д. 1, кв. 2",
      addressLine2: null,
      postalCode: "156723",
      idType: "Паспорт гражданина РФ",
      idSeries: null,
      idNumber: "123456",
      idIssueDate: "2018-05-25T00:00:00.000Z",
      idValidityDate: "3000-01-01T00:00:00.000Z",
      departmentCode: "123-456"
    };

    return await userService.signup(signupData)
             .then(res => {
                expect(res.status).toBe(200);
            });
  });

  it('Test 6: sign up incorrect birth date', async () => {
    const signupData: PostUser = {
      firstName: "Полина",
      lastName: "Дыхал",
      patronymic: null,
      birthDate: "1900-08-01T00:00:00.000Z",
      email: "dykhal@gmail.com",
      phoneNum: null,
      password: "123456",
      country: "Российская Федерация",
      region: "Московская область",
      city: null,
      addressLine1: "ул. Какая-то, д. 1, кв. 2",
      addressLine2: null,
      postalCode: "156723",
      idType: "Паспорт гражданина РФ",
      idSeries: null,
      idNumber: "123456",
      idIssueDate: "2018-05-25T00:00:00.000Z",
      idValidityDate: "3000-01-01T00:00:00.000Z",
      departmentCode: "123-456"
    };

    return await userService.signup(signupData)
             .then(res => {
                expect(res.status).toBe(400);
            });
  });

  it('Test 7: sign up empty email', async () => {
    const signupData: PostUser = {
      firstName: "Полина",
      lastName: "Дыхал",
      patronymic: null,
      birthDate: "2002-08-01T00:00:00.000Z",
      email: "",
      phoneNum: null,
      password: "123456",
      country: "Российская Федерация",
      region: "Московская область",
      city: null,
      addressLine1: "ул. Какая-то, д. 1, кв. 2",
      addressLine2: null,
      postalCode: "156723",
      idType: "Паспорт гражданина РФ",
      idSeries: null,
      idNumber: "123456",
      idIssueDate: "2018-05-25T00:00:00.000Z",
      idValidityDate: "3000-01-01T00:00:00.000Z",
      departmentCode: "123-456"
    };

    return await userService.signup(signupData)
             .then(res => {
                expect(res.status).toBe(400);
            });
  });

  it('Test 8: sign up wrong idValidityDate', async () => {
    const signupData: PostUser = {
      firstName: "Полина",
      lastName: "Дыхал",
      patronymic: null,
      birthDate: "2002-08-01T00:00:00.000Z",
      email: "dykhal@gmail.com",
      phoneNum: null,
      password: "123456",
      country: "Российская Федерация",
      region: "Московская область",
      city: null,
      addressLine1: "ул. Какая-то, д. 1, кв. 2",
      addressLine2: null,
      postalCode: "156723",
      idType: "Паспорт гражданина РФ",
      idSeries: null,
      idNumber: "123456",
      idIssueDate: "2018-05-25T00:00:00.000Z",
      idValidityDate: "2008-05-25T00:00:00.000Z",
      departmentCode: "123-456"
    };

    return await userService.signup(signupData)
             .then(res => expect(res.status).toBe(400));
  });

  it('Test 9: get user profile', async () => {
    const loginData: LoginUser = {
        email: "test-user@gmail.com",
        password: "111111"
    };

    await userService.login(loginData)
               .then(res => res.json())
               .then(res => userService.setJwt(res.jwt));
    
    return await userService.getProfile()
      .then(res => {
        expect(res.status).toBe(200);
        return res.json();
      })
      .then(res => expect(res).not.toHaveProperty('password'));
  });

  it('Test 10: change profile successfully', async () => {
    const changeData: PatchUser = {
      firstName: "Тестовый",
      lastName: "Пользователь",
      patronymic: "Измененный",
      birthDate: "2002-08-01T00:00:00.000Z",
      email: "test-user@gmail.com",
      phoneNum: null,
      oldPassword: "111111",
      newPassword: "",
      country: "Российская Федерация",
      region: "Московская область",
      city: null,
      addressLine1: "ул. Какая-то, д. 1, кв. 2",
      addressLine2: null,
      postalCode: "156723",
      idType: "Паспорт гражданина РФ",
      idSeries: null,
      idNumber: "123456",
      idIssueDate: "2018-05-25T00:00:00.000Z",
      idValidityDate: "2008-05-25T00:00:00.000Z",
      departmentCode: "123-456"
    };

    return await userService.changeSettings(changeData)
             .then(res => expect(res.status).toBe(200));
  });

  it('Test 11: change profile incorrect password', async () => {
    const changeData: PatchUser = {
      firstName: "Тестовый",
      lastName: "Пользователь",
      patronymic: "Измененный",
      birthDate: "2002-08-01T00:00:00.000Z",
      email: "test-user@gmail.com",
      phoneNum: null,
      oldPassword: "999999",
      newPassword: null,
      country: "Российская Федерация",
      region: "Московская область",
      city: null,
      addressLine1: "ул. Какая-то, д. 1, кв. 2",
      addressLine2: null,
      postalCode: "156723",
      idType: "Паспорт гражданина РФ",
      idSeries: null,
      idNumber: "123456",
      idIssueDate: "2018-05-25T00:00:00.000Z",
      idValidityDate: "2008-05-25T00:00:00.000Z",
      departmentCode: "123-456"
    };

    return await userService.changeSettings(changeData)
             .then(res => expect(res.status).toBe(400));
  });
});
