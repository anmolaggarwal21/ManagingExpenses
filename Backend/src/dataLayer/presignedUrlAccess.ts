import * as AWS from 'aws-sdk'

const s3 = new AWS.S3({
    signatureVersion: 'v4'
    
})

const imageBucket = process.env.IMAGES_S3_BUCKET
const expirationTime = Number(process.env.Signed)
export class presignedUrlAccess{

    getPresignedUrlInAccessClass(Id: string){
       return  s3.getSignedUrl('putObject',{
            Bucket: imageBucket,
            Key: Id,
            Expires: expirationTime

        })
    }

}