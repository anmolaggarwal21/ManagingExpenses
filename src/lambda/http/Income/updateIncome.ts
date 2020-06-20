import { updateIncomeServiceByIncomeId } from "../../../businessLogic/incomeBusiness"
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda"
import { updateIncomeRequest } from "../../../request/createIncomeRequest"
import { createLogger } from '../../utils'

const logger = createLogger('updateIncome')


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {

    logger.info('inside update income')
    const incomeId = event.pathParameters.userId
    logger.info('inside update income id is ', incomeId)
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

