import { useState } from "react";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../contexts/ConfigContext";
import './Cards.css';
import { CardModel, PostCard } from "../models/CardModel";
import CardService from "../services/CardService";
import useGetCards from "../hooks/useGetCards";
import CardInfo from "../components/CardInfo";

export default function Cards() {
  const [status, cards, setCards] = useGetCards(apiUrl, localStorage.getItem('jwt')!, useParams().accountId!);
  const [paymentSystem, setPaymentSystem] = useState('VISA');
  const [error, setError] = useState('');

  let navigate = useNavigate();
  let params = useParams();

  const handleOpenCard = (event: any) => {
    event.preventDefault();

    const cardService: CardService = new CardService(apiUrl, localStorage.getItem('jwt')!);
    const postCard: PostCard = {
      paymentSystem: paymentSystem,
    }

    cardService.openCard(params.accountId!, postCard)
    .then(res => {
      if (res.ok) {
        setError("Карта выпущена");
        return res.json();
      }
      else {
        throw res.status;
      }
    })
    .then(res => {
      setCards([...cards, res]);
    })
    .catch(err => {
      if (err === 400) {
        setError('Ошибка: можно выпустить не более пяти карт');
        return;
      }
      else {
        setError('Ошибка сервера');
        return;
      }
    });
  }

  const handleTransaction = (cardId: string) => {
    navigate(`/accounts/${params.accountId}/cards/${cardId}/send`);
  }

  return (
    <div>
      <div className="send-header">
        <ul>
          <li>
            <h1 className="page-title">Карты</h1>
          </li>
          <li>
            {cards.length === 0 ? <p className="error-message">У Вас нет выпущенных карт</p> : <></>}
          </li>
        </ul>
      </div>
      <div className="signup-form">
      <ul>
        <form onSubmit={handleOpenCard}>
        <li>
          <select className="select-box" required name="paymentSystem"
            value={paymentSystem} onChange={(e) => setPaymentSystem(e.target.value)}>
            <option value="VISA">VISA</option>
            <option value="MasterCard">MasterCard</option>
            <option value="MIR">МИР</option>
          </select>
        </li>
        <li>
          <button className="big-button" type="submit">Выпустить карту</button>
        </li>
        </form>
        <li>
          {error === '' ? <></> : <p className="error-message">{error}</p>}
        </li>
      </ul>
    </div>
      <div className="send-body">
        {
          cards.map((card: CardModel) => {
            return (
              <>
                <div className="send-container">
                  <CardInfo cardInfo={card} />
                  <div className="send-buttons">
                    <div className="send-lower-button">
                      <button onClick={() => handleTransaction(card.id.toString())} className="send-button">Перевести</button>
                    </div>
                  </div>
                </div>
              </>
            )
          })
        }
      </div>
    </div>
  );
}
