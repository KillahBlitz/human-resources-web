import { Component, signal, inject } from '@angular/core';
import { Empleado } from '../../empleado';
import { EmpleadosService } from '../empleados.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.html',
  imports: [ CommonModule, RouterModule ]
})

export class ListaComponent {
  empleados = signal<Empleado[]>([]);
  private empleadoService = inject(EmpleadosService);

  constructor() {
    this.Cargar();
  }

  Cargar() {
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (data) => this.empleados.set(data),
      error: (error) => console.error('Error al cargar empleados', error)
    });
  }
}


