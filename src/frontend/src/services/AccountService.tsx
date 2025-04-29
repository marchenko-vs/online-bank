import { AccountModel, PostAccount } from "../models/AccountModel";

export default class AccountService {
  private baseUrl: string;
  private jwt: string;

  constructor(baseUrl: string, jwt: string) {
    this.baseUrl = baseUrl;
    this.jwt = jwt;
  }

  public setJwt(jwt: string): void {
    this.jwt = jwt;
  }

  public async getAccounts(): Promise<Response> {
    return await fetch(`/api/v1/accounts/me`, {
      method: 'GET', 
      headers: { 'Authorization': `Bearer ${this.jwt}` },
    });
  }

  public async openAccount(postAccount: PostAccount): Promise<Response> {
    return await fetch(`/api/v1/accounts`, {
      method: 'POST', 
      headers: { 
        'Authorization': `Bearer ${this.jwt}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(postAccount)
    });
  }
}
