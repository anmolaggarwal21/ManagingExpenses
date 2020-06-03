import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { deleteIncomeServiceByIncomeId } from "../../../businessLogic/incomeBusiness";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {

    console.log('processing event', event)

    const incomeId = event.pathParameters.userId

   var result =  await deleteIncomeServiceByIncomeId(incomeId)

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

    