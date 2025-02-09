import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {

  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  create(createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentRepository.save(createStudentDto);
  }

  async getStudentsByGrade(grade: string): Promise<Student[]> {
    if(grade == "0"){
      return this.studentRepository.find();
    }
    return this.studentRepository.find({ where: { grado: grade } });
  }
}
