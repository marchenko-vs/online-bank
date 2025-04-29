import { CardModel, PostCard } from "../models/CardModel";

export default class CardService {
  private baseUrl: string;
  private jwt: string;

  constructor(baseUrl: string, jwt: string) {
    this.baseUrl = baseUrl;
    this.jwt = jwt;
  }

  public setJwt(jwt: string): void {
    this.jwt = jwt;
  }

  public async getCard(cardId: string): Promise<Response> {
    return await fetch(`/api/v1/cards/${cardId}`, {
      method: 'GET', 
      headers: { 'Authorization': `Bearer ${this.jwt}` },
    });
  }

  public async getCards(accountId: string): Promise<Response> {
    return await fetch(`/api/v1/accounts/${accountId}/cards`, {
      method: 'GET', 
      headers: { 'Authorization': `Bearer ${this.jwt}` },
    });
  }

  public async openCard(accountId: string, postCard: PostCard): Promise<Response> {
    return await fetch(`/api/v1/accounts/${accountId}/cards`, {
      method: 'POST', 
      headers: { 
        'Authorization': `Bearer ${this.jwt}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(postCard)
    });
  }
}
