import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService:TasksService){}
    
    @Get()
    getTasks(@Query() filterDto:GetTaskFilterDto):Task[]{ 
        if(Object.keys(filterDto).length){
            return this.taskService.getTaskWithFilter(filterDto)
        }
        else{
            return this.taskService.getAllTasks()
        }
    }

    @Get("/:id")
    getTaskById(@Param('id') id:string):Task{
        return this.taskService.getTaskById(id)
    }

    @Delete("/:id")
    deleteTaskById(@Param('id') id:string):void{
        return this.taskService.deleteTaskById(id)
    }

    @Patch("/:id/status")
    updateTaskStatus(@Param('id') id:string , @Body() UpdateTaskStatusDto:UpdateTaskStatusDto):Task{
        const {status} = UpdateTaskStatusDto;
        return this.taskService.updateTaskStatus(id , status)
    }
    @Post()
    // createTask(@Body('title') title:string ,@Body('description') description:string  ){
        createTask(@Body() createTaskDto:CreateTaskDto):Task{
        return this.taskService.createTask(createTaskDto)
    }

}