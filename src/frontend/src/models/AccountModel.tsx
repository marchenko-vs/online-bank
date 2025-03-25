export interface AccountModel {
    id: number;
    userId: number;
    number: string;
    issueDate: string;
    balance: number;
    currency: string;
    status: string;
}

export interface PostAccount {
    currency: string;
}

export default AccountModel;
