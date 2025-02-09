import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AlumnoDto } from '../../dtos/alumno.dto';
import { AlumnoService } from '../../alumno.service';
import { Grade } from '../registrar-alumno/interfaces/grade';
import { MatSelectModule } from '@angular/material/select';
import { gradesData } from '../../constants/grade.constants';
import { AlertServiceService } from '../../../utils/alert-service.service';

@Component({
  selector: 'app-listar-alumno',
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatGridListModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './listar-alumno.component.html',
  styleUrl: './listar-alumno.component.css',
})
export class ListarAlumnoComponent implements OnInit {
  students: AlumnoDto[] = [];

  displayedColumns: string[] = [
    'nombre',
    'grado',
    'seccion',
    'fechaNacimiento',
    'nombrePadre',
    'nombreMadre',
    'fechaIngreso',
  ];

  dataSource = new MatTableDataSource(this.students);
  gradeFilter: number | null = null;

  grades = [
    {
      id: 0,
      value: 'Todos',
    },
    ...gradesData,
  ];

  constructor(
    private alumnoService: AlumnoService,
    private alertService: AlertServiceService
  ) {}

  ngOnInit(): void {
    this.applyFilter(0);
  }

  applyFilter(selectedValue: number): void {
    this.alumnoService.getAlumnos(selectedValue).subscribe({
      next: (data) => {
        this.students = data;
        this.dataSource.data = this.students;
        if(this.students.length == 0){
          this.alertService.showMessage('No hay alumnos registrados', "info");
        }
      },
      error: (err) => {
        this.alertService.showMessage('Error al cargar datos', "info");
      },
    });
  }
}
