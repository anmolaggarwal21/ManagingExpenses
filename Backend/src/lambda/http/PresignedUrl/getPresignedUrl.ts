import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {getPresignedUrl} from '../../../businessLogic/presignedUrlBusiness'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {
    console.log(' processing event' , event)
    
    var Id = event.pathParameters.Id
    var signedUrl =  getPresignedUrl(Id)
    return{
        statusCode:201,
        headers:{
            'Access-Control-Allow-Origin' :'*'
        },
        body :  JSON.stringify( {
          uploadUrl : signedUrl
        } )
    }
    
}