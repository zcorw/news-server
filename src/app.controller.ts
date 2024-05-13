import { Body, Controller, HttpCode, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDto, RegisterDto } from './user/user/dto';
import { ResultData } from 'src/common/result';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  @HttpCode(200)
  login(@Body() user: LoginDto): Promise<ResultData> {
    return this.appService.login(user);
  }

  @Post('/register')
  @HttpCode(200)
  register(@Body() user: RegisterDto): Promise<ResultData> {
    return this.appService.register(user);
  }
}
