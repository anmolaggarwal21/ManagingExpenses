import  { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register'
import {getIncomeService} from '../../../businessLogic/incomeBusiness'
import { createLogger } from "../../utils";

const logger = createLogger('getIncome')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {
 console.log('Processing evemt:', event)
 logger.info('Processing event', event)
 const incomeId = event.pathParameters.userId
 var result = await getIncomeService(incomeId)

 return{
     statusCode : 200,
     
    headers:{
        'Access-Control-Allow-Origin' :'*'
    },
     body : JSON.stringify({
        item:  
            result
         })
     }
 }
 

