import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {createCategoryRequest} from '../../../request/createCategoryRequest'
import {createCategoryService} from '../../../businessLogic/categoryBusiness'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {

    console.log('event processing', event)

    const createCategory:createCategoryRequest = JSON.parse( event.body )
 

    var result = await createCategoryService(createCategory)

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