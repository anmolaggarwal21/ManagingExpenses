import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {getCategoryByCategoryId} from '../../../businessLogic/categoryBusiness'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {

    console.log('processing event', event)
    const categoryId = event.pathParameters.Id
    const result = await getCategoryByCategoryId(categoryId)

    return{
        statusCode: 201,
        body:JSON.stringify({
            items : result
        }),
         headers:{
            'Access-Control-Allow-Origin' :'*'
        }
    }

}