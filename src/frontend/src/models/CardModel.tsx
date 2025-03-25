export interface CardModel {
    id: number;
    accountId: number;
    paymentSystem: string;
    number: string;
    issueDate: string;
    validityDate: string;
    cvv: string,
    balance: number;
    currency: string;
    status: string;
}

export interface PostCard {
    paymentSystem: string;
}

export default CardModel;
