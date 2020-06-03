import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { deleteExpenseServiceByExpenseId } from "../../../businessLogic/expenseBusiness";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {

    console.log('processing event', event)

    const expenseId = event.pathParameters.Id

   var result =  await deleteExpenseServiceByExpenseId(expenseId)

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

    