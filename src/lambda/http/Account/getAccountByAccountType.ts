// import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

// import { getAccountByTypeService } from "../../../businessLogic/accountBusiness";

// export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {

//     console.log('processing event', event)
//     const accountType = event.pathParameters.Id
//     const result = await getAccountByTypeService(accountType)

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