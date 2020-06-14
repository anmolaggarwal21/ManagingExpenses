import {presignedUrlAccess} from '../dataLayer/presignedUrlAccess'

var presignedUrlAccessVariable = new presignedUrlAccess();
export  function getPresignedUrl(imageId){
    
    return  presignedUrlAccessVariable.getPresignedUrlInAccessClass(imageId)

}