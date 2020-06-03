import  { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register'
import {createIncomeRequest } from '../../../request/createIncomeRequest'
import { createIncomeService } from '../../../businessLogic/incomeBusiness'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {
 console.log('Processing evemt:', event)
 const createIncome:createIncomeRequest = JSON.parse( event.body )
 
 console.log(createIncome.amount)
 console.log('date is',new Date().toISOString())
 
 console.log('before calling service')
 
 var result = await createIncomeService(createIncome)

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