
import {createDynamoDBClient} from '../dataLayer/categoryAccess'
import {Account} from '../models/Account'
import { updateAccountRequest } from '../request/createAccountRequest'

export class accountAccess{
private readonly docClient = createDynamoDBClient()
private readonly bankTable = process.env.Account_Table
private readonly accounTableIndex = process.env.ACCOUNT_TYPE_INDEX

     async createAccountAccess(account: Account){
       await  this.docClient.put({
            TableName: this.bankTable,
            Item : account
        }).promise()

        return account
    }

    async getAccountAccessById(accountId: string): Promise<Account[]>{
     var result =  await this.docClient.query({
            TableName: this.bankTable,
            KeyConditionExpression: 'accountId = :accountId' ,
            ExpressionAttributeValues:{
                ':accountId' : accountId   
            }
        }).promise()

        return result.Items as Account[]
    }

    async getAccountAccessByType(accountType: string): Promise<Account[]>{
        var result = await this.docClient.query({
            TableName: this.bankTable,
            KeyConditionExpression: 'accountType = :accountType',
            ExpressionAttributeValues:{
                ':accountType' : accountType
            },
            IndexName :this.accounTableIndex
        }).promise()

        return result.Items as Account[]
    }

    async deleteAccountAccessById(accountId: string){
        await this.docClient.delete(
            {
                TableName: this.bankTable,
                Key:{
                    accountId: accountId
                }
            }).promise()

            return true
        
    }

    async updateAccountAccessById(accountId: string, updateAccount : updateAccountRequest): Promise<Account>{
        await this.docClient.update({
            TableName: this.bankTable,
            Key:{
                accountId: accountId
            },
            UpdateExpression: "set  description = :dd, accountType =:a , accountName =:i ",
            ExpressionAttributeValues:{
            
            ":dd": updateAccount.description,
            ":a": updateAccount.accountType,
            ":i" : updateAccount.accountName
        },
        }).promise()

        return  {
            accountId: accountId,
            description: updateAccount.description,
            accountType: updateAccount.accountType,
            accountName : updateAccount.accountName

        }
    }
}



