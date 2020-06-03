import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getIncomeServiceByUserId } from "../../../businessLogic/incomeBusiness";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {

    const userId= event.pathParameters.userId

    var result = await getIncomeServiceByUserId(userId)

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