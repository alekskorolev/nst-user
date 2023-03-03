import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash, compare } from 'bcrypt';
import { CreateCredentialDto } from './credential.dto';
import { Credential } from './credentisl.entity';

@Injectable()
export class BasicService {
  @InjectRepository(Credential)
  private readonly repository: Repository<Credential>

  public async create({ login, password }: CreateCredentialDto): Promise<boolean> {
    const credential = new Credential()
    const salt = await genSalt()

    const hashPassword = await hash(password, salt)
    credential.login = login
    credential.password = hashPassword

    const result = this.repository.save(credential)
    console.log(result)
    return !!result
  }

  public async check({ login, password }: CreateCredentialDto): Promise<boolean> {
    const credential = await this.repository.findOne({ where: { login } })
    console.log(credential)
    if (!credential) {
      return false
    }
    const valid = await compare(password, credential.password)
    return valid
  }
}
