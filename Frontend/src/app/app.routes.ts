import { Routes } from '@angular/router';
import { ListaComponent } from './empleados/lista/lista';
import { AgregarComponent } from './empleados/agregar/agregar';
import { EditarComponent } from './empleados/editar/editar';
import { EliminarComponent } from './empleados/eliminar/eliminar';

export const routes: Routes = [
  { path: 'empleados', component: ListaComponent},
  { path: 'agregar-empleado', component: AgregarComponent},
  { path: 'editar-empleado/:id', component: EditarComponent},
  { path: 'eliminar-empleado/:id', component: EliminarComponent},
  { path: '', redirectTo: 'empleados', pathMatch: 'full' }
];
