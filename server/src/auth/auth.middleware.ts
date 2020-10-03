import {ConfigService} from '@nestjs/config'
import {Injectable, NestMiddleware} from '@nestjs/common'

interface Req extends Request {
  // eslint-disable-next-line @typescript-eslint/ban-types
  params: {}
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  async use(req: Req, res: Response, next: () => void): Promise<void> {
    if (!req.url.includes('api')) {
      next()
      return
    }

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
