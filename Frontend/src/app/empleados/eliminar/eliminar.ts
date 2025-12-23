import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmpleadosService } from '../empleados.service';
import { Empleado } from '../../empleado';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eliminar',
  imports: [CommonModule, RouterModule],
  templateUrl: './eliminar.html',
})
export class EliminarComponent implements OnInit {
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

  eliminando = false;
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

  confirmarEliminacion() {
    if (this.eliminando) return;
    this.eliminando = true;
    this.error = '';

    this.empleadoService.eliminarEmpleado(this.empleadoId).subscribe({
      next: () => this.router.navigate(['/empleados']),
      error: (err) => {
        this.error = 'Error al eliminar el empleado';
        console.error(err);
        this.eliminando = false;
        this.cdr.detectChanges();
      }
    });
  }

  cancelar() {
    this.router.navigate(['/empleados']);
  }
}
