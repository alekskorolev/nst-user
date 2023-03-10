import { IsNotEmpty, IsString } from 'class-validator';
import { Profile } from 'src/profile/profile.entity';

export class TokenDto {
  @IsString()
  public access_token: any;
}

export class CredentialDto {
  @IsString()
  @IsNotEmpty()
  public login: string;

  public profile?: Profile;
}

export class CreateCredentialDto extends CredentialDto {
  @IsString()
  @IsNotEmpty()
  public password: string;
}
