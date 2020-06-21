import  { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register'
import {createIncomeRequest } from '../../../request/createIncomeRequest'
import { createIncomeService } from '../../../businessLogic/incomeBusiness'
//import  {getUserId} from '../../utils' 
import { createLogger } from '../../utils'

const logger = createLogger('createIncome')



export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {
   logger.info('Processing evemt:', event)
 const createIncome:createIncomeRequest = JSON.parse( event.body )
 //const authorization = event.headers.Authorization
 
 logger.info(createIncome.amount.toString())
 logger.info('date is',new Date().toISOString())
 var userId = event.headers.userid
 logger.info('user id is', userId)   
 logger.info('before calling service')

 
 var result = await createIncomeService(createIncome,userId)

   return{
      statusCode : 201,
      body : JSON.stringify({
         item : result
      }),
      headers:{
         'Access-Control-Allow-Origin' :'*'
     }
   }

}