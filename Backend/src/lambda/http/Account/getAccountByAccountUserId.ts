import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {  getAccountByUserIdService } from "../../../businessLogic/accountBusiness";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {

    console.log('processing event', event)
    var accountType =''
    const userid = event.headers.userid
    if(event.queryStringParameters){
    accountType = event.queryStringParameters.accountType
    }
   
    
    var  result = await getAccountByUserIdService(userid,accountType)
    
    return{
        statusCode: 201,
        body:JSON.stringify({
            items : result
        }),
         headers:{
            'Access-Control-Allow-Origin' : "*",
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 'userid, authorization'
        }
    }

}