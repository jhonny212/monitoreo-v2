import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateNewAlumnoDto } from './dtos/create-alumno.dto';
import { AlumnoDto } from './dtos/alumno.dto';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAlumnos(id: number) {
    return this.http.get<AlumnoDto[]>(`${this.apiUrl}api/alumnos/consultar-alumno/${id}`);
  }

  registerAlumno(data: CreateNewAlumnoDto){
    return this.http.post(`${this.apiUrl}api/alumnos/crear-alumno`, {
      ...data,
       fechaNacimiento: data.fechaNacimiento.toISOString().split('T')[0],
       fechaIngreso: data.fechaIngreso.toISOString().split('T')[0]
    });
  }
}
