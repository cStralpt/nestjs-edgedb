import { Controller, Get, Put, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}
  @UseGuards(JwtGuard)
  @Get('get-todos')
  getTodos() {
    console.log({ todo: this.todosService.getTodos() });
    return this.todosService.getTodos();
  }
  @Put('add-todo')
  addTodo() {
    return this.todosService.addTodo();
  }
  @Get('delete-todo')
  deleteTodo() {
    return this.todosService.deleteTodo();
  }
}
