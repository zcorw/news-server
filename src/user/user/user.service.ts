import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { RegisterDto, LoginDto } from './dto';
import { hashPassword, now } from 'src/common/utils';
import { DelFlagEnum } from 'src/common/enum';
import { ResultCode } from 'src/common/enum/code';
import { ResultData } from 'src/common/result';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    @Inject(RoleService)
    private readonly roleService: RoleService,
  ) {}
  async findOne(userId: UserEntity['userId']) {
    const role = this.roleService.findAdmin();
  }
  /**
   * 创建用户
   */
  async create(userInfo: RegisterDto): Promise<UserEntity> {
    const username = userInfo.username;
    const password = userInfo.password;
    const { hashedPassword, salt } = await hashPassword(password);
    const role = await this.roleService.findAdmin();
    const res = await this.userRepo.save({
      username,
      password: hashedPassword,
      salt,
      loginDate: now(),
      roles: [role],
    });
    return res;
  }
  /**
   * 登录用户
   */
  async login(userInfo: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { username: userInfo.username, delFlag: DelFlagEnum.NOTDELETED },
      select: ['userId', 'status'],
    });
    if (!user) {
      return ResultData.fail(ResultCode.USERNOTFOUND, 'User not found');
    }
    const { hashedPassword } = await hashPassword(userInfo.password, user.salt);
    if (hashedPassword !== user.password) {
      return ResultData.fail(ResultCode.USERNOTFOUND, 'Password error');
    }
  }
}
