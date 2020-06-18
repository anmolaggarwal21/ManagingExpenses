
import {createDynamoDBClient} from '../dataLayer/categoryAccess'
import {Account} from '../models/Account'
import { updateAccountRequest } from '../request/createAccountRequest'

export class accountAccess{
private readonly docClient = createDynamoDBClient()
private readonly bankTable = process.env.Account_Table
private readonly accounTableIndex = process.env.ACCOUNT_TYPE_INDEX
private readonly accountTableUserIndex = process.env.ACCOUNT_USER_ID_INDEX

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

    // async getAccountAccessByType(accountType: string): Promise<Account[]>{
    //     var result = await this.docClient.query({
    //         TableName: this.bankTable,
    //         KeyConditionExpression: 'accountType = :accountType',
    //         ExpressionAttributeValues:{
    //             ':accountType' : accountType
    //         },
    //         IndexName :this.accounTableIndex
    //     }).promise()

    //     return result.Items as Account[]
    // }

    async getAccountAccessByUserId(userId: string, accountType?: string): Promise<Account[]>{

        console.log('account type is ', accountType)
        console.log('user id in category is', userId)
        var queryParam
         queryParam={
            TableName: this.bankTable,
            IndexName: this.accountTableUserIndex,
            KeyConditionExpression: 'accountUserId = :accountUserId',
            ExpressionAttributeValues:{
                ':accountUserId' : userId
            },
    
        }
        if(accountType && accountType !=''){
            console.log('inside if of data layer')
             queryParam={
                TableName: this.bankTable,
                IndexName: this.accountTableUserIndex,
                KeyConditionExpression: 'accountUserId = :accountUserId',
                
                FilterExpression: 'accountType = :accountType',
                ExpressionAttributeValues:{
                    ':accountType' : accountType,
                    ':accountUserId': userId
                }
            }
    
        }
    
        var result = await this.docClient.query(queryParam).promise()
    
        return result.Items as Account[]

      
    }

    async getAllAccountAccess(): Promise<Account[]>{
        var result = await this.docClient.query({
            TableName: this.bankTable,
            KeyConditionExpression: 'accountType IN (:debitType ,:creditType)',
            ExpressionAttributeValues:{
                ':debitType' : 'Debit',
                ':creditType' : 'Credit'
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

    async updateAccountAccessById(accountId: string, updateAccount : updateAccountRequest): Promise<any>{
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



