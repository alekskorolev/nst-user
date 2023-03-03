import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateProfileDto } from './profile.dto';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  @Inject(ProfileService)
  private readonly service: ProfileService;

  @Get(':id')
  public async getProfile(@Param('id') id: string): Promise<Profile>{
    const profile = await this.service.getProfile(id);
    return profile;
  }
  @Get()
  public async getAll(): Promise<Profile[]>{
    const profiles = await this.service.getAll()
    return profiles
  }

  @Post()
  public async register(@Body() body: CreateProfileDto): Promise<Profile> {
    const profile = await this.service.createProfile(body)
    return profile
  }
}