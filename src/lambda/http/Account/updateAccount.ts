
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda"

import { updateAccountRequest } from "../../../request/createAccountRequest"
import { updateAccountService } from "../../../businessLogic/accountBusiness"

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {


    const accountId = event.pathParameters.Id
    const updateRequest : updateAccountRequest = JSON.parse( event.body ) 
    var result = await updateAccountService(accountId, updateRequest)

    return {
        statusCode : 200,
        body: JSON.stringify({
            item: result
        }),
        headers:{
           'Access-Control-Allow-Origin' :'*'
       }
    }
}

