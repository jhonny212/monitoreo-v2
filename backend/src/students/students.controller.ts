import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, ValidateTokenDto } from './dto/login.dto';

@Controller('api/alumnos')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly authService: AuthService, 
  ) {}

  @Post('token')
  async login(@Body() user: LoginDto) {
    return this.authService.login(user.username, user.password)
  }

  @Post('token/verify')
  async validate(@Body() token: ValidateTokenDto) {
    return this.authService.validateToken(token.token)
  }

  @Post("crear-alumno")
  @UseGuards(JwtAuthGuard)
  create(@Body() createStudentDto: CreateStudentDto) {
    console.log(createStudentDto);
    
    return this.studentsService.create(createStudentDto);
  }

  @Get('consultar-alumno/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.studentsService.getStudentsByGrade(id);
  }
}
