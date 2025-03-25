import UserService from '../services/UserService';
import { expect } from '@jest/globals';
import { apiUrl } from '../contexts/ConfigContext';
import { LoginUser } from '../models/UserModel';
import { PostAccount } from '../models/AccountModel';
import CardService from '../services/CardService';
import AccountService from '../services/AccountService';
import { PostCard } from '../models/CardModel';

describe('Test CardService class', () => {
  const cardService: CardService = new CardService(apiUrl, '');

  it('Test 1: open card', async () => {
    const userService: UserService = new UserService(apiUrl, '');
    const accountService: AccountService = new AccountService(apiUrl, '');
    const loginData: LoginUser = {
      email: "test-user@gmail.com",
      password: "111111"
    };
    await userService.login(loginData)
      .then(res => res.json())
      .then(res => {
        userService.setJwt(res.jwt);
        accountService.setJwt(res.jwt);
        cardService.setJwt(res.jwt);
      });

    let accountId: number = 0;

    await accountService.getAccounts()
          .then(res => res.json())
          .then(res => accountId = res[0].id);

    const cardData: PostCard = {
      paymentSystem: "VISA"
    };

    return await cardService.openCard(accountId.toString(), cardData)
                .then(res => {
                expect(res.status).toBe(200);
              });
  });

  it('Test 2: get all cards', async () => {
    const userService: UserService = new UserService(apiUrl, '');
    const accountService: AccountService = new AccountService(apiUrl, '');
    const loginData: LoginUser = {
      email: "test-user@gmail.com",
      password: "111111"
    };
    await userService.login(loginData)
      .then(res => res.json())
      .then(res => {
        userService.setJwt(res.jwt);
        accountService.setJwt(res.jwt);
        cardService.setJwt(res.jwt);
      });

    let accountId: number = 0;

    await accountService.getAccounts()
          .then(res => res.json())
          .then(res => accountId = res[0].id);

    return await cardService.getCards(accountId.toString())
                .then(res => {
                expect(res.status).toBe(200);
                return res.json();
              })
              .then(res => expect(res[0]).toHaveProperty("number"));
  });
});
