import { CustomAuthorizerEvent, CustomAuthorizerResult } from "aws-lambda";
import Axios from 'axios'
import { jwks }  from '../../models/jwks'
import { verify } from 'jsonwebtoken'
import {JwtPayload} from '../../models/JwtPayload'

var jwksCertificate : string 
export const handler = async (
    event: CustomAuthorizerEvent
  ): Promise<CustomAuthorizerResult> => {
  
    console.log('processing event in the authorization class', event.authorizationToken)
    const jwksData =  await Axios.get('https://dev-n1ovzx7w.auth0.com/.well-known/jwks.json')
    const jwks : jwks = jwksData.data
    jwksCertificate = jwks.keys[0].x5c[0]

    try {
        const jwtToken = await verifyToken(event.authorizationToken)
        console.log("inside try able to pass the value")
        
    
        return {
          principalId: jwtToken.sub,
          policyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Action: 'execute-api:Invoke',
                Effect: 'Allow',
                Resource: '*'
              }
            ]
          }
        }
      } catch (e) {
        
    
        return {
          principalId: 'user',
          policyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Action: 'execute-api:Invoke',
                Effect: 'Deny',
                Resource: '*'
              }
            ]
          }
        }
    }
    
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
    
    
    
    try{
        const token = getToken(authHeader)
      return await verify(token, certToPEM(jwksCertificate), { algorithms : ['RS256'] }) as JwtPayload 
    }
    catch(error )
    {
      console.log("error is ", error)
      throw error 
    }
    
   
  }

  
function getToken(authHeader: string): string {
    if (!authHeader) throw new Error('No authentication header')
  
    if (!authHeader.toLowerCase().startsWith('bearer '))
      throw new Error('Invalid authentication header')
  
    const split = authHeader.split(' ')
    const token = split[1]
  
    return token
  }
  
  function certToPEM(cert) {
    cert = cert.match(/.{1,64}/g).join('\n');
    cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
    return cert;
  }
  