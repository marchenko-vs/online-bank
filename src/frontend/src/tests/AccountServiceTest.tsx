import UserService from '../services/UserService';
import { expect } from '@jest/globals';
import { apiUrl } from '../contexts/ConfigContext';
import AccountService from '../services/AccountService';
import { LoginUser } from '../models/UserModel';
import { PostAccount } from '../models/AccountModel';

describe('Test AccountService class', () => {
  const accountService: AccountService = new AccountService(apiUrl, '');

  it('Test 1: create account for unauthorized user', async () => {
    const accountData: PostAccount = {
      currency: "RUB"
    };
    
    return await accountService.openAccount(accountData)
             .then(res => {
              expect(res.status).toBe(401);
            });
  });

  it('Test 2: create account with unsupported currecny', async () => {
    const userService: UserService = new UserService(apiUrl, '');
    const loginData: LoginUser = {
      email: "test-user@gmail.com",
      password: "111111"
    };
    await userService.login(loginData)
      .then(res => res.json())
      .then(res => {
        userService.setJwt(res.jwt);
        accountService.setJwt(res.jwt);
      });
      
    const accountData: PostAccount = {
      currency: "CAD"
    };
    
    return await accountService.openAccount(accountData)
             .then(res => {
              expect(res.status).toBe(400);
            });
  });

  it('Test 3: create account successfully', async () => {
    const userService: UserService = new UserService(apiUrl, '');
    const loginData: LoginUser = {
      email: "test-user@gmail.com",
      password: "111111"
    };
    await userService.login(loginData)
      .then(res => res.json())
      .then(res => {
        userService.setJwt(res.jwt);
        accountService.setJwt(res.jwt);
      });

      const accountData: PostAccount = {
        currency: "RUB"
      };
      
      return await accountService.openAccount(accountData)
               .then(res => {
                  expect(res.status).toBe(200);
                });
  });

  it('Test 4: get user accounts for unauthorized user', async () => {
    accountService.setJwt('');
    return await accountService.getAccounts()
              .then(res => {
                expect(res.status).toBe(401);
              });
  });

  it('Test 5: get user accounts successfully', async () => {
    const userService: UserService = new UserService(apiUrl, '');
    const loginData: LoginUser = {
      email: "test-user@gmail.com",
      password: "111111"
    };
    await userService.login(loginData)
      .then(res => res.json())
      .then(res => {
        userService.setJwt(res.jwt);
        accountService.setJwt(res.jwt);
      });
      
      return await accountService.getAccounts()
               .then(res => {
                  expect(res.status).toBe(200);
                });
  });
});
