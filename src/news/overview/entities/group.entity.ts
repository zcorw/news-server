import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base';
import { BriefEntity } from './brief.entity';

@Entity('newsGroup', {
  comment: '新闻聚合表',
})
export class NewsGroupEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'group_id',
    comment: '聚合组ID',
  })
  public id: number;

  @Column({
    type: 'varchar',
    name: 'title',
    length: 100,
    comment: '聚合标题',
  })
  public title: string;

  @OneToMany(() => BriefEntity, (brief) => brief.group)
  public briefs: BriefEntity[];
}
