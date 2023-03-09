import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  @InjectRepository(Profile)
  private readonly repository: Repository<Profile>;

  public getProfile(id: string): Promise<Profile> {
    return this.repository.findOne({ where: { id } });
  }

  public getAll(): Promise<Profile[]> {
    return this.repository.find({ where: { isDeleted: false } });
  }

  public createProfile(body: CreateProfileDto): Promise<Profile> {
    const profile: Profile = new Profile();

    profile.name = body.name;
    profile.email = body.email;

    return this.repository.save(profile);
  }
}
