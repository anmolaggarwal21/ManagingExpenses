export class urlForServer {
    public static http : string = 'https://'
    public static domain : string = 'slcwobihdb'
    public static executeApi : string = 'execute-api' 
    public static region : string = 'us-east-2'
    public static amazon : string = 'amazonaws.com' 
    public static environment: string = 'dev' 

    public static wholeUrl = urlForServer.http+urlForServer.domain+'.'+urlForServer.executeApi+'.'+urlForServer.region+'.'+urlForServer.amazon+'/'+urlForServer.environment

    public static authClientID = "MsUi6lZAEIAts4H7UohQn6ce7E1NFc5c"
    public static authDomain = "dev-n1ovzx7w.auth0.com"
    public static authResponseType = 'token id_token'
    public static authRedirectUri= "http://my-manageexpense.s3-website.us-east-2.amazonaws.com/callback"
    public static authScope = 'openid profile'


    
        
        
        

    
}