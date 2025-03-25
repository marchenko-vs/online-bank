import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import TransactionService from "../services/TransactionService";
import { apiUrl } from "../contexts/ConfigContext";
import './Transaction.css';
import useGetCard from "../hooks/useGetCard";
import { PostTransaction } from "../models/TransactionModel";

function getFormValues() {
  const storedValues = localStorage.getItem('transactionFormValues');

  if (!storedValues) {
    return {
      receiverNumber: '',
      sum: ''
    };
  }

  return JSON.parse(storedValues);
}

export default function Transaction () {
  const authContext = useContext(AuthContext);

  const [status, senderCard, setSenderCard] = useGetCard(apiUrl, localStorage.getItem('jwt')!, useParams().cardId!);
  const [formValues, setFormValues] = useState(getFormValues());
  const [error, setError] = useState('');

  let navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
      localStorage.setItem("transactionFormValues", JSON.stringify(formValues));
    }, [formValues]);

  function handleChange(event: any) {
    setFormValues((prevFormValues: any) => ({
      ...prevFormValues, [event.target.name]: event.target.value,
    }));
  }

  const handleSendMoney = (e: any) => {
    e.preventDefault();

    const transactionService: TransactionService = new TransactionService(apiUrl, localStorage.getItem('jwt')!);
    let postTransaction: PostTransaction = {
      senderNumber: senderCard!.number,
      receiverNumber: formValues.receiverNumber,
      sum: formValues.sum as unknown as number
    };

    transactionService.sendMoney(postTransaction)
    .then(res => {
      if (res.ok) {
        setError('Средства успешно отправлены');
        return res.json();
      }
      else {
        throw res.status;
      }
    })
    .catch(err => {
      if (err === 400) {
        setError('Ошибка: введены некорректные данные');
        return;
      }
      else if (err === 404) {
        setError('Ошибка: карты с таким номером не существует');
        return;
      }
      else if (err === 409) {
        setError('Ошибка: невозможно отправить средства');
        return;
      }
      else {
        setError('Ошибка: сервер не обработал запрос');
        return;
      }
    });
  }
  
  return (
    <div className="transaction-form">
      <ul>
        <li>
          <h1 className="page-title">Перевод средств</h1>
        </li>
        <form onSubmit={handleSendMoney}>
          <li>
            <input className="text-box" name="senderNumber" value={senderCard?.number}></input>
          </li>
          <li>
            <input className="text-box" name="receiverNumber" placeholder="Карта получателя"
              minLength={16} maxLength={16} value={formValues.receiverNumber} onChange={handleChange}></input>
          </li>
          <li>
            <input className="text-box" name="sum" placeholder="Сумма"
              value={formValues.sum} onChange={handleChange}></input>
          </li>
          <li>
            <button className="big-button" type="submit">Перевести</button>
          </li>
        </form>
        <li>
          {error === '' ? <></> : <p className="error-message">{error}</p>}
        </li>
      </ul>
    </div>
  )
}
