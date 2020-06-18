import * as winston from 'winston'
import { decode } from 'jsonwebtoken'
import { JwtPayload } from '../models/JwtPayload'

/**
 * Create a logger instance to write log messages in JSON format.
 *
 * @param loggerName - a name of a logger that will be added to all messages
 */
export function createLogger(loggerName: string) {
    return winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { name: loggerName },
      transports: [
        new winston.transports.Console()
      ]
    })
  }

export function getUserId(authorizationfromHeader : string): string {

  const split = authorizationfromHeader.split(' ')
  const jwtToken = split[1]
  const decodedJwt = decode(jwtToken) as JwtPayload
  const userId = decodedJwt.sub
  return userId

}