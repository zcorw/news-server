import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './user/auth/auth.module';
import { UserModule } from './user/user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RoleService } from './user/role/role.service';
import { RoleController } from './user/role/role.controller';
import { RoleModule } from './user/role/role.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    RoleModule,
  ],
  controllers: [AppController, RoleController],
  providers: [AppService, RoleService],
})
export class AppModule {}
