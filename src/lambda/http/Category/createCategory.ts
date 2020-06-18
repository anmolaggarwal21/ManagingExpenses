import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {createCategoryRequest} from '../../../request/createCategoryRequest'
import {createCategoryService} from '../../../businessLogic/categoryBusiness'
//import { getUserId } from "../../utils";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {

    console.log('event processing', event)

    const createCategory:createCategoryRequest = JSON.parse( event.body )
    //const authorization = event.headers.Authorization
    var userId = event.headers.userid
    var result = await createCategoryService(createCategory,userId)

    return{
        statusCode: 201,
        body: JSON.stringify(
            { item: result }
        ),
        headers:{
            'Access-Control-Allow-Origin' :'*'
        }
    }

    
}