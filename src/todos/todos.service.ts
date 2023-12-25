import { Injectable } from '@nestjs/common';
import { Todos } from 'dbschema/interfaces';
import { client } from 'src/lib/edgedb';
import { addTodo } from 'src/queries/addTodo.query';
import { deleteTodo } from 'src/queries/deleteTodo.query';

@Injectable()
export class TodosService {
  async getTodos() {
    const result = await client.query<Todos>(`
      select Todos {
      name,
      value
      }
    `);

    const todos: Todos[] = result;
    return todos[0];
  }
  async addTodo() {
    const result = await addTodo(client);
    return result;
  }
  async deleteTodo() {
    const result = await deleteTodo(client);
    return result;
  }
}
