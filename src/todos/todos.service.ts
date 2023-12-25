import { Injectable } from '@nestjs/common';
import * as edgedb from 'edgedb';
import { Todos } from 'dbschema/interfaces';

@Injectable()
export class TodosService {
  async getTodos() {
    const client = edgedb.createClient();
    const result = await client.query<Todos>(`
      select Todos {
      name,
      value
      }
    `);

    const todos: Todos[] = result;
    return todos[0];
  }
}
