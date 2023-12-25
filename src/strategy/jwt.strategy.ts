import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'dbschema/interfaces';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { client } from 'src/lib/edgedb';
import { getUser } from 'src/queries/getUser.query';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'my-auth-strategy-name',
) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: User) {
    const users = await getUser(client, { username: payload.username });
    console.log({ users });
    return users;
  }
}
