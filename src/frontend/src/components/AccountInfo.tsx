import { AccountModel } from "../models/AccountModel";

type accountProps = {
  accountInfo: AccountModel;
}

export default function AccountInfo({ accountInfo }: accountProps) {
  let map = new Map<string, string>();
  map.set("RUB", "₽");
  map.set("USD", "$");
  map.set("EUR", "€");

  return (
    <div className="text-info">
      <p>Номер счета: {accountInfo.number}</p>
      <p>Дата открытия: {new Date(accountInfo.issueDate).toLocaleDateString()}</p>
      <p>Баланс: {accountInfo.balance.toFixed(2)}</p>
      <p>Валюта: {map.get(accountInfo.currency)}</p>
      <p>Статус: {accountInfo.status}</p>
    </div>
  );
}
