import { PrimaryColumn, Entity } from 'typeorm';

@Entity('user_with_role', {
  comment: '角色表',
})
export class UserWithRoleEntity {
  @PrimaryColumn({ type: 'int', name: 'user_id', comment: '用户ID' })
  public userId: number;

  @PrimaryColumn({ type: 'int', name: 'role_id', comment: '角色ID' })
  public roleId: number;
}
