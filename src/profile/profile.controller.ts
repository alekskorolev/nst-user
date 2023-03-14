import { Body, Controller, Get, Inject, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';
import { CreateProfileDto } from './profile.dto';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  @Inject(ProfileService)
  private readonly service: ProfileService;


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async getUserProfile(@Param('id') id: string): Promise<Profile> {
    const profile = await this.service.getProfile(id);
    return profile;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getProfile(@Request() req): Promise<Profile> {
    const { id } = req.user
    const profile = await this.service.getProfile(id);
    return profile;
  }

  @Post()
  public async register(@Body() body: CreateProfileDto): Promise<Profile> {
    const profile = await this.service.createProfile(body);
    return profile;
  }
}
