import { PostUser, LoginUser, PatchUser } from "../models/UserModel";

export default class UserService {
  private baseUrl: string;
  private jwt: string;

  constructor(baseUrl: string, jwt: string) {
    this.baseUrl = baseUrl;
    this.jwt = jwt;
  }

  public setJwt(jwt: string): void {
    this.jwt = jwt;
  }

  public async login(loginUser: LoginUser): Promise<Response> {
    return await fetch(`/api/v1/users/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(loginUser)
    });
  }

  public async signup(postUser: PostUser): Promise<Response> {
    return await fetch(`/api/v1/users`, {
      method: 'POST', 
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(postUser)
    });
  }

  public async getProfile(): Promise<Response> {
    return await fetch(`/api/v1/users/me`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${this.jwt}` }
    });
  }

  public async changeSettings(patchUser: PatchUser): Promise<Response> {
    return await fetch(`/api/v1/users/me`, {
      method: 'PATCH', 
      headers: { 'content-type': 'application/json',
                 'Authorization': `Bearer ${this.jwt}` },
      body: JSON.stringify(patchUser)
    });
  }
}
