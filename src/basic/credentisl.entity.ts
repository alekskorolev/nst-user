import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Profile } from 'src/profile/profile.entity';

@Entity()
export class Credential {
  @PrimaryGeneratedColumn()
  public id!: number;

  @PrimaryColumn({ type: 'varchar', length: 120, nullable: false })
  public login: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  public password: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  /*0
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
