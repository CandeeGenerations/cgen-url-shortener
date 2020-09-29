import {ConfigService} from '@nestjs/config'
import {Injectable, NestMiddleware} from '@nestjs/common'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  async use(req: Request, res: Response, next: () => void): Promise<void> {
    const serverAuthToken = this.configService.get<string>('AUTH_TOKEN')
    const authToken = req.headers['x-cgen-auth']?.toString()

    if (!authToken) {
      throw new Error(
        'The authentication token is not valid: No token received.',
      )
    }

    if (authToken !== serverAuthToken) {
      throw new Error('The authentication token is not valid.')
    }

    next()
  }
}
