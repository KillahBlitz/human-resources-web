import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmpleadosService } from '../empleados.service';
import { Empleado } from '../../empleado';

@Component({
  selector: 'app-editar',
  imports: [FormsModule, RouterModule],
  templateUrl: './editar.html',
})
export class EditarComponent implements OnInit {
  private empleadoService = inject(EmpleadosService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  empleado: Empleado = {
    employment_id: 0,
    name: '',
    department: '',
    salary: 0
  };

  guardando = false;
  cargando = true;
  error = '';
  empleadoId: number = 0;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'No se proporcionó un ID de empleado';
      this.cargando = false;
      return;
    }

    this.empleadoId = Number(id);

    if (isNaN(this.empleadoId)) {
      this.error = 'ID de empleado inválido';
      this.cargando = false;
      return;
    }

    this.cargarEmpleado();
  }

  cargarEmpleado() {
    this.empleadoService.obtenerEmpleadoPorId(this.empleadoId).subscribe({
      next: (data) => {
        this.empleado = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = `Error al cargar el empleado: ${err.message || err.status || 'Desconocido'}`;
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit() {
    if (this.guardando) return;
    this.guardando = true;
    this.error = '';

    const { employment_id, ...payload } = this.empleado;

    this.empleadoService.editarEmpleado(this.empleadoId, payload as Empleado).subscribe({
      next: () => this.router.navigate(['/empleados']),
      error: (err) => {
        this.error = 'Error al actualizar el empleado';
        console.error(err);
        this.guardando = false;
        this.cdr.detectChanges();
      }
    });
  }
}
