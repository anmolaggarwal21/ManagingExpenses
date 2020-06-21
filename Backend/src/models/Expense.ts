import { bool } from "aws-sdk/clients/signer";

export interface Expense{
    
    expenseId: string,
    amount: number,
    date: string,
    imageUrl?: string,
    Description: string,
    CategoryId: string,
    userId: string,
    accountId: string,
    isImage: bool
}