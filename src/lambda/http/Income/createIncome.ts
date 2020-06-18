import  { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register'
import {createIncomeRequest } from '../../../request/createIncomeRequest'
import { createIncomeService } from '../../../businessLogic/incomeBusiness'
//import  {getUserId} from '../../utils' 


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {
 console.log('Processing evemt:', event)
 const createIncome:createIncomeRequest = JSON.parse( event.body )
 //const authorization = event.headers.Authorization
 
 console.log(createIncome.amount)
 console.log('date is',new Date().toISOString())
 var userId = event.headers.userid
 console.log('user id is', userId)   
 console.log('before calling service')

 
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