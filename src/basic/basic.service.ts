import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash, compare } from 'bcrypt';
import { CreateCredentialDto, CredentialDto, TokenDto } from './credential.dto';
import { Credential } from './credentisl.entity';
import { Profile } from 'src/profile/profile.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BasicService {
  @InjectRepository(Credential)
  private readonly repository: Repository<Credential>;

  @InjectRepository(Profile)
  private readonly profileRepo: Repository<Profile>;

  constructor(
    private jwtService: JwtService
  ) {}

  public async create({
    login,
    password,
  }: CreateCredentialDto): Promise<boolean> {
    const credential = new Credential();
    const salt = await genSalt();

    const profile = new Profile();
    profile.name = login;
    this.profileRepo.save(profile);

    const hashPassword = await hash(password, salt);
    credential.login = login;
    credential.profile = profile;
    credential.password = hashPassword;

    const result = await this.repository.save(credential);
    console.log(result);
    return !!result;
  }

  public async validate({
    login,
    password,
  }: CreateCredentialDto): Promise<CredentialDto|null> {
    const credential = await this.repository.findOne({
      where: { login },
      relations: { profile: true },
    });
    console.log(credential);
    if (!credential) {
      return null;
    }
    const { password: pwd, ...user} = credential;
    const valid = await compare(password, pwd);
    return valid ? user : null;
  }

  public async login(user: CredentialDto): Promise<TokenDto> {
    const payload = { username: user.login, sub: user.profile.id }
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
