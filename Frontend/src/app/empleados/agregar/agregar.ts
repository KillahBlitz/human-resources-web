import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmpleadosService } from '../empleados.service';
import { Empleado } from '../../empleado';

@Component({
  selector: 'app-agregar',
  imports: [FormsModule, RouterModule],
  templateUrl: './agregar.html',
})

export class AgregarComponent {
  private empleadoService = inject(EmpleadosService);
  private router = inject(Router);

  empleado: Empleado = {
    employment_id: 0,
    name: '',
    department: '',
    salary: 0
  };

  guardando = false;
  error = '';

  onSubmit() {
    if (this.guardando) return;
    this.guardando = true;
    this.error = '';

    const {employment_id, ...payload} = this.empleado;

    this.empleadoService.agregarEmpleado(payload as Empleado).subscribe({
      next: () => this.router.navigate(['/empleados']),
      error: (err) => {
        this.error = 'Error al guardar el empleado';
        console.error(err);
        this.guardando = false;
      }
    });
  }

}
