import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { getAccountByIdService } from "../../../businessLogic/accountBusiness";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {

    console.log('processing event', event)
    const accountId = event.pathParameters.Id
    const result = await getAccountByIdService (accountId)

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