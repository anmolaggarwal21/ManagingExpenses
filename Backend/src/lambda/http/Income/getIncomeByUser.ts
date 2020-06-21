import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getIncomeServiceByUserId } from "../../../businessLogic/incomeBusiness";
import { createLogger } from '../../utils'

const logger = createLogger('getIncomeByUser')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {

    var userId = event.headers.userid
    logger.info('user id is', userId)
    var result = await getIncomeServiceByUserId(userId)

    return{
        statusCode : 200,
        body : JSON.stringify({
           item : result
        }),
        headers:{
           'Access-Control-Allow-Origin' :'*',
           'Access-Control-Allow-Headers' : 'userid'
       }
    }

}