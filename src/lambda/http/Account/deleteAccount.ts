import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { deleteAccountByIdService } from "../../../businessLogic/accountBusiness";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {

    console.log('processing event', event)

    const accountId = event.pathParameters.Id

   var result =  await deleteAccountByIdService(accountId)

    return{
        statusCode : 200,
        body : JSON.stringify({
           item : result
        }),
        headers:{
           'Access-Control-Allow-Origin' :'*'
       }
    }

}

    