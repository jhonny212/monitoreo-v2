import { Component } from '@angular/core';
import { Grade } from './interfaces/grade';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { AlumnoService } from '../../alumno.service';
import { gradesData } from '../../constants/grade.constants';
import { AlertServiceService } from '../../../utils/alert-service.service';

@Component({
  selector: 'app-registrar-alumno',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './registrar-alumno.component.html',
  styleUrl: './registrar-alumno.component.css',
})
export class RegistrarAlumnoComponent {
  studentForm: FormGroup;
  secciones = ['A', 'B', 'C', 'D', 'E'];
  gradesData = gradesData;

  constructor(
    private fb: FormBuilder,
    private alumnoService: AlumnoService,
    private alertService: AlertServiceService
  ) {
    this.studentForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      fechaNacimiento: ['', Validators.required],
      nombrePadre: ['', Validators.required],
      nombreMadre: ['', Validators.required],
      grado: ['', Validators.required],
      seccion: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.alumnoService.registerAlumno(this.studentForm.value).subscribe({
        next: (response) => {
          this.alertService.showMessage('Alumno registrado exitosamente', 'success');
          this.studentForm.reset();
        },
        error: (error) => {
          this.alertService.showMessage('Error al registrar alumno', 'error');
        },
      });
    } else {
      this.alertService.showMessage('Formulario invalido', 'info');
    }
  }
}
