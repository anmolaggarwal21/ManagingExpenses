import  { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register'
import {createExpenseRequest } from '../../../request/createExpenseRequest'
import { createExpenseeService } from '../../../businessLogic/expenseBusiness'
//import { getUserId } from '../../utils';


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {
 console.log('Processing event:', event)
 const createExpense:createExpenseRequest = JSON.parse( event.body )
 
 console.log(createExpense.amount)
 console.log('date is',new Date().toISOString())
 //const authorization = event.headers.Authorization
 var userId = event.headers.userid
 
 console.log('before calling service')
 
 var result = await createExpenseeService(createExpense,userId)

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