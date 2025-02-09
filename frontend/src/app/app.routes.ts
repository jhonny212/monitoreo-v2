import { Routes } from '@angular/router';
import { RegistrarAlumnoComponent } from './alumno/views/registrar-alumno/registrar-alumno.component';
import { ListarAlumnoComponent } from './alumno/views/listar-alumno/listar-alumno.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: ListarAlumnoComponent, canActivate: [authGuard] },
  { path: 'registrar-alumno', component: RegistrarAlumnoComponent, canActivate: [authGuard] },
];
