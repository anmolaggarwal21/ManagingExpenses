export interface createExpenseRequest{
    
    amount: number,
    imageUrl?: string,
    Description: string,
    CategoryId: string,
    accountId: string
}

export interface updateExpenseRequest extends createExpenseRequest  {

}