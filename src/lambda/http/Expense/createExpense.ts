import  { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register'
import {createExpenseRequest } from '../../../request/createExpenseRequest'
import { createExpenseeService } from '../../../businessLogic/expenseBusiness'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {
 console.log('Processing event:', event)
 const createExpense:createExpenseRequest = JSON.parse( event.body )
 
 console.log(createExpense.amount)
 console.log('date is',new Date().toISOString())
 
 console.log('before calling service')
 
 var result = await createExpenseeService(createExpense)

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