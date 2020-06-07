import { updateCatgoryByCategoryId } from "../../../businessLogic/categoryBusiness"
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda"
import { updateCategoryRequest } from "../../../request/createCategoryRequest"

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent ) : Promise<APIGatewayProxyResult> => {


    const categoryId = event.pathParameters.Id
    const updateRequest : updateCategoryRequest = JSON.parse( event.body ) 
    var result = await updateCatgoryByCategoryId(categoryId, updateRequest)

    return {
        statusCode : 200,
        body: JSON.stringify({
            item: result
        })
    }
}

