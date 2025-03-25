import { useEffect, useState } from "react";
import { GetUser } from "../models/UserModel";
import UserService from "../services/UserService";

type UsersHookType = [
  users: GetUser | null, 
  setUsers: (value: any) => void
]

export default function useGetProfile(baseUrl: string, jwt: string): UsersHookType {
  const [user, setUser] = useState(null);

  const userService: UserService = new UserService(baseUrl, jwt);

  useEffect(() => {
    userService.getProfile()
    .then(res => res.json())
    .then(res => setUser(res))
    .catch(err => {
      throw err
    })
  }, []);

  return [user, setUser];
}
