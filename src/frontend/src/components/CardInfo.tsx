import { CardModel } from "../models/CardModel";

type cardProps = {
  cardInfo: CardModel;
}

export default function CardInfo({ cardInfo }: cardProps) {
  let map = new Map<string, string>();
  map.set("RUB", "₽");
  map.set("USD", "$");
  map.set("EUR", "€");

  return (
    <div className="text-info">
      <p>Номер карты: {cardInfo.number}</p>
      <p>Дата открытия: {new Date(cardInfo.issueDate).toLocaleDateString()}</p>
      <p>Срок действия: {new Date(cardInfo.validityDate).toLocaleDateString()}</p>
      <p>CVV/CVC: {cardInfo.cvv}</p>
      <p>Баланс: {cardInfo.balance.toFixed(2)}</p>
      <p>Валюта: {map.get(cardInfo.currency)}</p>
      <p>Платежная система: {cardInfo.paymentSystem}</p>
      <p>Статус: {cardInfo.status}</p>
    </div>
  );
}
