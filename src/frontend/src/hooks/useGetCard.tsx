import { useEffect, useState } from "react";
import CardService from "../services/CardService";
import CardModel from "../models/CardModel";

export type CardsHookType = [
  status: number | undefined,
  card: CardModel | null, 
  setCards: (value: any) => void
]

export default function useGetCard(baseUrl: string, jwt: string, cardId: string): CardsHookType {
  const [card, setCard] = useState<CardModel | null>(null);
  const [status, setStatus] = useState(200);

  const cardService: CardService = new CardService(baseUrl, jwt);

  useEffect(() => {
    cardService.getCard(cardId)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      else {
        throw res.status;
      }
    })
    .then(res => setCard(res))
    .catch(err => {
      setStatus(err);
    });
  }, []);

  return [status, card, setCard];
}
