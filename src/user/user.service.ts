import { Injectable } from '@nestjs/common';
import { client } from 'src/lib/edgedb';
import { getUser } from 'src/queries/getUser.query';

@Injectable()
export class UserService {
  async getAllUsers() {
    const users = await getUser(client, { username: 'flick' });
    return users[0];
  }
}
