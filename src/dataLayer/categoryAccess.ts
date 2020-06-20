import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Category } from '../models/Category';
import { updateCategoryRequest } from '../request/createCategoryRequest';
import  *  as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)


export class categoryAccess{
    categoryTable = process.env.Category_Table
    categoryTableIndex = process.env.CATEGORY_TYPE_INDEX
    categoryUserIndex= process.env.CATEGORY_USERID_INDEX
    docClient: DocumentClient =  createDynamoDBClient()
constructor(){

}

// async getCategoryAccessByCategoryType(categoryType: string){
//     var result = await this.docClient.query({
//         TableName: this.categoryTable,
//         IndexName: this.categoryTableIndex,
//         KeyConditionExpression: 'categoryType = :categoryType',
//         ExpressionAttributeValues:{
//             ':categoryType' : categoryType
//         },

//     }).promise()

//     return result.Items
// }

async getCategoryAccessByCategoryUserId(UserId: string, categoryType?: string){
    console.log('category type is ', categoryType)
    console.log('user id in category is', UserId)
    var queryParam
     queryParam={
        TableName: this.categoryTable,
        IndexName: this.categoryUserIndex,
        KeyConditionExpression: 'categoryUserId = :categoryUserId',
        ExpressionAttributeValues:{
            ':categoryUserId' : UserId
        },

    }
    if(categoryType && categoryType !=''){
        console.log('inside if of data layer')
         queryParam={
            TableName: this.categoryTable,
            IndexName: this.categoryUserIndex,
            KeyConditionExpression: 'categoryUserId = :categoryUserId',
            
            FilterExpression: 'categoryType = :categoryType',
            ExpressionAttributeValues:{
                ':categoryType' : categoryType,
                ':categoryUserId': UserId
            }
        }

    }

    var result = await this.docClient.query(queryParam).promise()

    return result.Items
}

async getCategoryAccessByCategoryId(categoryId: string): Promise<Category[]> {
    console.log('income Id  is ', categoryId)
    var result = await this.docClient.query({
        TableName: this.categoryTable,
        KeyConditionExpression: 'categoryId = :categoryId',
        ExpressionAttributeValues:{
            ':categoryId' : categoryId
        },
    }).promise()

    return result.Items as Category[]
}

async createCategoryAccess(category : Category): Promise<Category>{
    await this.docClient.put({
        TableName: this.categoryTable,
        Item: category
    }).promise()

    return category
}

async deleteCategoryByCategoryId(categoryId: string){

    var result = await this.docClient.delete({
        TableName: this.categoryTable,
        Key : {
            categoryId: categoryId
        }
     }).promise()
     console.log(result)
     console.log(result.$response.data)
     return true

}

async updateCategoryByCategoryId(categoryId: string, updateCategoryRequest : updateCategoryRequest): Promise<updateCategoryRequest>{
    await  this.docClient.update({
        TableName: this.categoryTable,
        Key:{
            categoryId : categoryId
        },
        UpdateExpression: "set  categoryDescription = :dd, categoryName =:a , categoryType =:i ",
        ExpressionAttributeValues:{
            
            ":dd": updateCategoryRequest.categoryDescription,
            ":a": updateCategoryRequest.categoryName,
            ":i" : updateCategoryRequest.categoryType
        },
    //     ExpressionAttributeNames:{

    //       "#ts": "name"

    //   },
        ReturnValues:"UPDATED_NEW"

      }).promise()

      return updateCategoryRequest
}
}

export function createDynamoDBClient (){
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