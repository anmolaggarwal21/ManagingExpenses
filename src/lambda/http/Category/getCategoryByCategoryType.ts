// import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
// import {getCategoryByCategoryType} from '../../../businessLogic/categoryBusiness'

// export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {

//     console.log('processing event', event)
//     const categoryType = event.pathParameters.Id
//     try{
    
//         const userid = event.queryStringParameters.categoryUserId
//         const type = event.queryStringParameters.categoryType
//         console.log(userid)
//         console.log(type)
//     }
//     catch(error){
//         console.log('error ', error)
//     }
//     const result = await getCategoryByCategoryType(categoryType)

//     return{
//         statusCode: 201,
//         body:JSON.stringify({
//             items : result
//         }),
//          headers:{
//             'Access-Control-Allow-Origin' :'*'
//         }
//     }

// }