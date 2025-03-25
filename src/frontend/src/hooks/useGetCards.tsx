import { useEffect, useState } from "react";
import CardService from "../services/CardService";
import CardModel from "../models/CardModel";

export type CardsHookType = [
  status: number | undefined,
  cards: CardModel[], 
  setCards: (value: any) => void
]

export default function useGetCards(baseUrl: string, jwt: string, accountId: string): CardsHookType {
  const [cards, setCards] = useState([]);
  const [status, setStatus] = useState(200);

  const cardService: CardService = new CardService(baseUrl, jwt);

  useEffect(() => {
    cardService.getCards(accountId)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        throw res.status;
      }
    })
    .then(res => setCards(res))
    .catch(err => {
      setStatus(err);
    });
  }, []);

  return [status, cards, setCards];
}
