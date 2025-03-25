import UserService from '../services/UserService';
import { expect } from '@jest/globals';
import { apiUrl } from '../contexts/ConfigContext';
import AccountService from '../services/AccountService';
import { LoginUser } from '../models/UserModel';
import { PostAccount } from '../models/AccountModel';
import TransactionService from '../services/TransactionService';
import CardService from '../services/CardService';
import TransactionModel, { PostTransaction } from '../models/TransactionModel';

describe('Test TransactionService class', () => {
  const transactionService: TransactionService = new TransactionService(apiUrl, '');

  it('Test 1: create transaction', async () => {
    const userService: UserService = new UserService(apiUrl, '');
    const accountService: AccountService = new AccountService(apiUrl, '');
    const cardService: CardService = new CardService(apiUrl, '');

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
        transactionService.setJwt(res.jwt);
      });

    let accountId: number = 0;

    await accountService.getAccounts()
          .then(res => res.json())
          .then(res => accountId = res[0].id);

    let transactionData: PostTransaction = {
      senderNumber: "",
      receiverNumber: "",
      sum: 100
    };

    await cardService.getCards(accountId.toString())
                  .then(res => res.json())
                  .then(res => {
                    transactionData.senderNumber = res[0].number;
                    transactionData.receiverNumber = res[1].number;
                  });

    return await transactionService.sendMoney(transactionData)
                  .then(res => expect(res.status).toBe(400));
  });
});
