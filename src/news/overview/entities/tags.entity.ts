import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base';

@Entity('tag', {
  comment: '新闻标签表',
})
export class TagEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'tag_id',
    comment: '标签ID',
  })
  public tagId: number;

  @Column({
    type: 'varchar',
    name: 'tag_name',
    comment: '标签名称',
  })
  public name: string;
}
