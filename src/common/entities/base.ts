import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
//基础实体信息
@Entity()
export abstract class BaseEntity {
  @Column({
    type: 'enum',
    enum: ['active', 'disabled'],
    name: 'status',
    default: 'active',
    comment: '状态',
  })
  public status: string;

  @Column({
    type: 'enum',
    enum: ['y', 'n'],
    name: 'del_flag',
    default: 'n',
    comment: '删除标志',
  })
  public delFlag: string;

  @Column({
    type: 'varchar',
    name: 'create_by',
    length: 64,
    default: '',
    comment: '创建者',
  })
  public createBy: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_time',
    comment: '创建时间',
  })
  public createTime: Date;

  @Column({
    type: 'varchar',
    name: 'update_by',
    length: 64,
    default: '',
    comment: '更新者',
  })
  public updateBy: string;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_time',
    comment: '更新时间',
  })
  public updateTime: Date;

  @Column({
    type: 'varchar',
    name: 'remark',
    length: 500,
    default: '',
    comment: '备注',
  })
  public remark: string;
}
