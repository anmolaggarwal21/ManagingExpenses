import { updateIncomeServiceByIncomeId } from "../../../businessLogic/incomeBusiness"
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda"
import { updateIncomeRequest } from "../../../request/createIncomeRequest"

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {


    const incomeId = event.pathParameters.userId
    const updateRequest : updateIncomeRequest = JSON.parse( event.body ) 
    var result = await updateIncomeServiceByIncomeId(incomeId, updateRequest)

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

