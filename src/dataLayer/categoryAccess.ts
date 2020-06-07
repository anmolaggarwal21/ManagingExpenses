import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Category } from '../models/Category';
import { updateCategoryRequest } from '../request/createCategoryRequest';



export class categoryAccess{
    categoryTable = process.env.Category_Table
    categoryTableIndex = process.env.CATEGORY_TYPE_INDEX
    docClient: DocumentClient =  createDynamoDBClient()
constructor(){

}

async getCategoryAccessByCategoryType(categoryType: string){
    var result = await this.docClient.query({
        TableName: this.categoryTable,
        IndexName: this.categoryTableIndex,
        KeyConditionExpression: 'categoryType = :categoryType',
        ExpressionAttributeValues:{
            ':categoryType' : categoryType
        },

    }).promise()

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
        return new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint : 'http://localhost:8000'
        })
    }
    else{
        return new AWS.DynamoDB.DocumentClient();
    }
}