import { bool } from "aws-sdk/clients/signer";

export interface Income{
    
    incomeId: string,
    amount: number,
    date: string,
    imageUrl?: string,
    Description: string,
    CategoryId: string,
    userId: string,
    isImage: bool
}