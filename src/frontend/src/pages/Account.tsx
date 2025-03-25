import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import useGetAccounts from "../hooks/useGetAccounts";
import { apiUrl } from "../contexts/ConfigContext";
import './Account.css';
import { AccountModel, PostAccount } from "../models/AccountModel";
import AccountInfo from "../components/AccountInfo";
import AccountService from "../services/AccountService";

export default function Account() {
  const [status, accounts, setAccounts] = useGetAccounts(apiUrl, localStorage.getItem('jwt')!);
  const [currency, setCurrency] = useState('RUB');
  const [error, setError] = useState('');

  let navigate = useNavigate();

  const handleOpenAccount = (event: any) => {
    event.preventDefault();

    const accountService: AccountService = new AccountService(apiUrl, localStorage.getItem('jwt')!);
    const postAccount: PostAccount = {
      currency: currency,
    }

    accountService.openAccount(postAccount)
    .then(res => {
      if (res.ok) {
        setError("Счет открыт");
        return res.json();
      }
      else {
        throw res.status;
      }
    })
    .then(res => {
      setAccounts([...accounts, res]);
    })
    .catch(err => {
      if (err === 409) {
        setError('Ошибка: счет уже открыт');
        return;
      }
      else {
        setError('Ошибка сервера');
        return;
      }
    });
  }

  const handleGetCards = (accountId: number) => {
    navigate(`/accounts/${accountId}/cards`);
  }

  return (
    <div>
      <div className="account-header">
        <ul>
          <li>
            <h1 className="page-title">Счета</h1>
          </li>
          <li>
            {accounts.length === 0 ? <p className="error-message">У Вас нет открытых счетов</p> : <></>}
          </li>
        </ul>
      </div>
      <div className="signup-form">
      <ul>
        <form onSubmit={handleOpenAccount}>
        <li>
          <select className="select-box" required name="currency"
            value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="RUB">Российский рубль</option>
            <option value="USD">Доллар США</option>
            <option value="EUR">Евро</option>
          </select>
        </li>
        <li>
          <button className="big-button" type="submit">Открыть счет</button>
        </li>
        </form>
        <li>
          {error === '' ? <></> : <p className="error-message">{error}</p>}
        </li>
      </ul>
    </div>
      <div className="account-body">
        {
          accounts.map((account: AccountModel) => {
            return (
              <>
                <div className="account-container">
                  <AccountInfo accountInfo={account} />
                  <div className="cards-lower-buttons">
                    <div className="cards-lower-button">
                      <button onClick={() => handleGetCards(account.id)} className="cards-button">Карты</button>
                    </div>
                  </div>
                </div>
              </>
            )
          })
        }
      </div>
    </div>
  );
}
