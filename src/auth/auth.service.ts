import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { addUser } from 'src/queries/addUser.query';
import { client } from 'src/lib/edgedb';
import { User } from 'dbschema/interfaces';
import { getUser } from 'src/queries/getUser.query';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    const passwordHash = await argon.hash(dto.password);
    addUser(client, {
      ...dto,
      password: passwordHash,
    } as User);
    return dto;
  }
  async signin(dto: AuthDto) {
    const user = await getUser(client, {
      username: dto.username,
    });
    let isPasswordCorrect: boolean;
    if (user[0] !== undefined) {
      isPasswordCorrect = await argon.verify(user[0]?.password, dto.password);
      if (isPasswordCorrect == false) {
        return {
          message: 'Incorrect Credentials',
        };
      }
      return this.generateJwtToken({
        userId: user[0].id,
        username: user[0].username,
      });
    }
    return {
      message: 'Incorrect Credentials',
    };
  }
  async generateJwtToken({
    userId,
    username,
  }: {
    userId: string;
    username: string;
  }) {
    const payload = { sub: userId, username: username };
    return {
      JwtToken: await this.jwt.signAsync(payload, {
        expiresIn: '30m',
        secret: this.config.get('JWT_SECRET'),
      }),
    };
  }
}
