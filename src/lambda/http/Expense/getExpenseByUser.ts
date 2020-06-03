import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getExpenseServiceByUserId } from "../../../businessLogic/expenseBusiness";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {

    const userId= event.pathParameters.Id

    var result = await getExpenseServiceByUserId(userId)

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