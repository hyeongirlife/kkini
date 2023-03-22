import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
// username은 유니크해야 한다는 조건을 table에 설정
// 이렇게 하면 굳이 find 옵션으로 존재여부 검증할 필요 없다.
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
