import { Controller, Get } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}
  @Get('get-todos')
  getTodos() {
    console.log({ todo: this.todosService.getTodos() });
    return this.todosService.getTodos();
  }
}
