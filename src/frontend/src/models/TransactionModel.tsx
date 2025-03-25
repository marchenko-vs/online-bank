export interface TransactionModel {
    id: number;
    cardId: number;
    senderNumber: string;
    receiverNumber: string;
    sum: number;
    currency: string;
    date: string;
    status: string;
}

export interface PostTransaction {
    senderNumber: string;
    receiverNumber: string;
    sum: number;
}

export default TransactionModel;