export interface createIncomeRequest{
    
     amount: number,
     imageUrl?: string,
     Description: string,
     CategoryId: string,
     categoryId: string
}

export interface updateIncomeRequest extends createIncomeRequest  {

}