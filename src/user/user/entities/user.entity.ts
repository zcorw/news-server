import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/entities/base';

@Entity('user', {
  comment: '用户表',
})
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
    comment: '用户ID',
  })
  public userId: number;

  @Column({
    type: 'varchar',
    name: 'user_name',
    length: 30,
    nullable: false,
    comment: '用户账号',
  })
  public userName: string;

  @Exclude({ toPlainOnly: true }) // 输出屏蔽密码
  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    comment: '用户登录密码',
  })
  public password: string;

  @Exclude({ toPlainOnly: true }) // 输出屏蔽盐
  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
    comment: '加密盐值',
  })
  public salt: string;

  @Column({ type: 'timestamp', name: 'login_date', comment: '最后登录时间' })
  public loginDate: Date;
}
