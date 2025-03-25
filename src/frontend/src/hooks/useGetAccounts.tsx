import { useEffect, useState } from "react";
import { AccountModel } from "../models/AccountModel";
import AccountService from "../services/AccountService";

export type AccountsHookType = [
  status: number | undefined,
  accounts: AccountModel[], 
  setAccounts: (value: any) => void
]

export default function useGetAccounts(baseUrl: string, jwt: string): AccountsHookType {
  const [accounts, setAccounts] = useState([]);
  const [status, setStatus] = useState(200);

  const accountService: AccountService = new AccountService(baseUrl, jwt);

  useEffect(() => {
    accountService.getAccounts()
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        throw res.status;
      }
    })
    .then(res => setAccounts(res))
    .catch(err => {
      setStatus(err);
    });
  }, []);

  return [status, accounts, setAccounts];
}
