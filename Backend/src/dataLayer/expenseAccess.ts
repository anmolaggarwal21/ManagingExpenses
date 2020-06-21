
import * as AWS from 'aws-sdk'
import {DocumentClient }from 'aws-sdk/clients/dynamodb'
import {Expense} from '../models/Expense'
import { updateExpenseRequest } from '../request/createExpenseRequest'
import  *  as AWSXRay from 'aws-xray-sdk'
const XAWS = AWSXRay.captureAWS(AWS)
 
export class expenseAccess{
    private readonly docClient: DocumentClient  = createDynamoDBClient()
    private readonly expenseTable: string = process.env.Expense_Table
    private readonly expenseIndexTable: string = process.env.EXPENSE_ID_INDEX
    constructor(){

    }

   async createExpense(expense: Expense): Promise<Expense>{
       var result = await this.docClient.put({

        TableName: this.expenseTable,
        Item: expense
       }).promise()
       console.log(' result is '+ result.$response.data)

       return expense as Expense
       
    
    
    
    }
   
    async getExpenseAccess(expenseId: string): Promise<Expense[]> {
        console.log('income Id  is ', expenseId)
        var result = await this.docClient.query({
            TableName: this.expenseTable,
            KeyConditionExpression: 'expenseId = :expenseId',
            ExpressionAttributeValues:{
                ':expenseId' : expenseId
            },
        }).promise()

        return result.Items as Expense[]
    }

    async getExpensebyUserId(userId: string): Promise<Expense[]>{
        console.log('user id is', userId)

        var result = await this.docClient.query({
            TableName: this.expenseTable,
            IndexName: this.expenseIndexTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues:{
                ':userId' : userId
            },
    
        }).promise()

        return result.Items as Expense[]
    }

    async deleteExpenseByExpenseId(expenseId: string){

        var result = await this.docClient.delete({
            TableName: this.expenseTable,
            Key : {
                expenseId: expenseId
            }
         }).promise()
         console.log(result)
         console.log(result.$response.data)
         return true

    }
    

async updateExpenseByExpenseId(expenseId: string, updateExpenseRequest :updateExpenseRequest ) : Promise<updateExpenseRequest>{

        await  this.docClient.update({
            TableName: this.expenseTable,
            Key:{
                expenseId : expenseId
            },
            UpdateExpression: "set CategoryId = :categoryId , Description = :dd, amount =:a , imageUrl =:i ",
            ExpressionAttributeValues:{
                ":categoryId":updateExpenseRequest.CategoryId,
                ":dd": updateExpenseRequest.Description,
                ":a": updateExpenseRequest.amount,
                ":i" : updateExpenseRequest.imageUrl ? true : false
            },
        //     ExpressionAttributeNames:{
  
        //       "#ts": "name"
  
        //   },
            ReturnValues:"UPDATED_NEW"
  
          }).promise()

          return updateExpenseRequest
    }
    

}

function createDynamoDBClient (){
    console.log(' process enc value is '+ process.env.IS_OFFLINE)
    if(process.env.IS_OFFLINE == 'true'){
        console.log('Creating a local dynamo db instance');
        return new XAWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint : 'http://localhost:8000'
        })
    }
    else{
        return new XAWS.DynamoDB.DocumentClient();
    }
    }