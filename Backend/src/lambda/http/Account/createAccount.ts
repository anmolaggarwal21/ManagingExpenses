import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {createAccountRequest} from '../../../request/createAccountRequest'
import {createAccountService } from '../../../businessLogic/accountBusiness'
//import { getUserId } from "../../utils";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {

    console.log('event processing', event)

    const createAccount:createAccountRequest = JSON.parse( event.body )
    //const authorization = event.headers.Authorization
    var userId = event.headers.userid

    var result = await createAccountService(createAccount,userId)

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