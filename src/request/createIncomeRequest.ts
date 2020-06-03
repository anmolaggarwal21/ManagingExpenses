export interface createIncomeRequest{
    
     amount: number,
     imageUrl?: string,
     Description: string,
     CategoryId: string 
}

export interface updateIncomeRequest extends createIncomeRequest  {

}