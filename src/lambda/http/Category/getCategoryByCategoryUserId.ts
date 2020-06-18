import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getCategoryByCategoryUserId} from '../../../businessLogic/categoryBusiness'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {

    console.log('processing event', event)
    var type = ''
    //const categoryUserId = event.pathParameters.Id
    const userid = event.headers.userid
    if(event.queryStringParameters){
     type = event.queryStringParameters.categoryType
    }
    const result = await getCategoryByCategoryUserId(userid,type)

    return{
        statusCode: 201,
        body:JSON.stringify({
            items : result
        }),
         headers:{
            'Access-Control-Allow-Origin' :'*'
        }
    }

}