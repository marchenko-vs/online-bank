import { TransactionModel, PostTransaction } from "../models/TransactionModel";

export default class TransactionService {
  private baseUrl: string;
  private jwt: string;

  constructor(baseUrl: string, jwt: string) {
    this.baseUrl = baseUrl;
    this.jwt = jwt;
  }

  public setJwt(jwt: string): void {
    this.jwt = jwt;
  }

  public async sendMoney(postTransaction: PostTransaction): Promise<Response> {
    return await fetch(`/api/v1/transactions`, {
      method: 'POST', 
      headers: { 
        'Authorization': `Bearer ${this.jwt}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(postTransaction)
    });
  }
}
