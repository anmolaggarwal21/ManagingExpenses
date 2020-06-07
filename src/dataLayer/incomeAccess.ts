
import * as AWS from 'aws-sdk'
import {DocumentClient }from 'aws-sdk/clients/dynamodb'
import {Income} from '../models/Income'
import { updateIncomeRequest } from '../request/createIncomeRequest'
 
export class incomeAccess{
    private readonly docClient: DocumentClient  = createDynamoDBClient()
    private readonly incomeTable: string = process.env.Income_Table
    private readonly incomeIndexTable: string = process.env.INCOME_ID_INDEX
    constructor(){

    }

   async createIncome(income: Income): Promise<Income>{
       var result = await this.docClient.put({

        TableName: this.incomeTable,
        Item: income
       }).promise()
       console.log(' result is '+ result.$response.data)

       return income as Income
       
    
    
    
    }
   
    async getIncomeAccess(incomeId: string): Promise<Income[]> {
        console.log('income Id  is ', incomeId)
        var result = await this.docClient.query({
            TableName: this.incomeTable,
            KeyConditionExpression: 'incomeId = :incomeId',
            ExpressionAttributeValues:{
                ':incomeId' : incomeId
            },
        }).promise()

        return result.Items as Income[]
    }

    async getIncomebyUserId(userId: string): Promise<Income[]>{
        console.log('user id is', userId)

        var result = await this.docClient.query({
            TableName: this.incomeTable,
            IndexName: this.incomeIndexTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues:{
                ':userId' : userId
            },
    
        }).promise()

        return result.Items as Income[]
    }

    async deleteIncomeByIncomeId(incomeId: string){

        var result = await this.docClient.delete({
            TableName: this.incomeTable,
            Key : {
                incomeId: incomeId
            }
         }).promise()
         console.log(result)
         console.log(result.$response.data)
         return true

    }
    

async updateIncomeByIncomeId(incomeId: string, updateIncomeRequest :updateIncomeRequest ) : Promise<updateIncomeRequest>{

        await  this.docClient.update({
            TableName: this.incomeTable,
            Key:{
                incomeId : incomeId
            },
            UpdateExpression: "set CategoryId = :categoryId , Description = :dd, amount =:a , imageUrl =:i ",
            ExpressionAttributeValues:{
                ":categoryId":updateIncomeRequest.CategoryId,
                ":dd": updateIncomeRequest.Description,
                ":a": updateIncomeRequest.amount,
                ":i" : updateIncomeRequest.imageUrl ? true : false
            },
        //     ExpressionAttributeNames:{
  
        //       "#ts": "name"
  
        //   },
            ReturnValues:"UPDATED_NEW"
  
          }).promise()

          return updateIncomeRequest
    }
    

}

function createDynamoDBClient (){
    console.log(' process enc value is '+ process.env.IS_OFFLINE)
    if(process.env.IS_OFFLINE == 'true'){
        console.log('Creating a local dynamo db instance');
        return new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint : 'http://localhost:8000'
        })
    }
    else{
        return new AWS.DynamoDB.DocumentClient();
    }
}