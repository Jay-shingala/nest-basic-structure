import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

// providers are inject as a dependency.
@Module({
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
