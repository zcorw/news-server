import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserWithRoleEntity } from './entities/user_with_role.entity';
import { RegisterDto, LoginDto } from './dto';
import { hashPassword, now } from 'src/common/utils';
import { RoleEnum } from 'src/common/enum';
import { ResultCode } from 'src/common/enum/code';
import { ResultData } from 'src/common/result';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(UserWithRoleEntity)
    private readonly userWithRole: Repository<UserWithRoleEntity>,
    private readonly jwtService: JwtService
  ) { }
  /**
   * 创建用户
   */  
  async create(userInfo: RegisterDto) {
    const username = userInfo.username;
    const password = userInfo.password;
    const { hashedPassword, salt } = await hashPassword(password);
    const res = await this.userRepo.save({ username, password: hashedPassword, salt, loginDate: now() });
    this.userWithRole.save({ userId: res.userId, roleId: RoleEnum.ADMIN });
    return ResultData.ok();
  }
  /**
   * 登录用户
   */
  async login(userInfo: LoginDto) {
    const user = await this.userRepo.findOne({ where: { username: userInfo.username }, select: ['userId']});
    if (!user) {
      return ResultData.fail(ResultCode.USERNOTFOUND, "User not found");
    }
    
  }
}
