import {Body, Controller, Get, Param, Post} from '@nestjs/common'
import {User} from 'src/models/graphql.schema'

import {UserModel} from 'src/models/models'
import {AuthService} from '../services/auth.service'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  findOrCreateUser(@Body('user') user: User): Promise<UserModel> {
    return this.authService.findOrCreateUser(user)
  }

  @Get(':googleId')
  findAuthorizedUser(@Param('googleId') googleId: string): Promise<UserModel> {
    return this.authService.findAuthorizedUser(googleId)
  }
}
