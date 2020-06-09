import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {  getAllAccountService } from "../../../businessLogic/accountBusiness";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {

    console.log('processing event', event)
    
    const result = await getAllAccountService()

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