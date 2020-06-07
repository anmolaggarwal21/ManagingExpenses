import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {createAccountRequest} from '../../../request/createAccountRequest'
import {createAccountService } from '../../../businessLogic/accountBusiness'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {

    console.log('event processing', event)

    const createAccount:createAccountRequest = JSON.parse( event.body )
 

    var result = await createAccountService(createAccount)

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