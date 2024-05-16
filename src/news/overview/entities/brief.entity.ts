import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/base';
import { TagEntity } from './tag.entity';
import { NewsGroupEntity } from './group.entity';

@Entity('brief', {
  comment: '新闻简报表',
})
export class BriefEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'brief_id',
    comment: '新闻ID',
  })
  public id: number;

  @Column({
    type: 'varchar',
    name: 'title',
    length: 100,
    nullable: false,
    comment: '新闻标题',
  })
  public title: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '新闻内容概括',
  })
  public summary: string;

  @Column({
    type: 'varchar',
    name: 'link',
    length: 100,
    comment: '新闻详情链接',
  })
  public link: string;

  @Column({
    type: 'tinyint',
    name: 'is_edit',
    default: 0,
    comment: '是否编辑过',
  })
  public isEdit: 1 | 0;

  @ManyToMany(() => TagEntity)
  @JoinTable()
  public tags: TagEntity[];

  @ManyToOne(() => NewsGroupEntity, (article) => article.briefs)
  group: NewsGroupEntity;
}
