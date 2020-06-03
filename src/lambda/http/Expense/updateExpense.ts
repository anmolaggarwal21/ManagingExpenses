import { updateExpenseServiceByExpenseId } from "../../../businessLogic/expenseBusiness"
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda"
import { updateExpenseRequest } from "../../../request/createExpenseRequest"

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {


    const expenseId = event.pathParameters.Id
    const updateRequest : updateExpenseRequest = JSON.parse( event.body ) 
    var result = await updateExpenseServiceByExpenseId(expenseId, updateRequest)

    return {
        statusCode : 200,
        body: JSON.stringify({
            item: result
        })
    }
}

