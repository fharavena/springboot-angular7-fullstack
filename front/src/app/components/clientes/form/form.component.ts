import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from '../../../models/cliente';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public titulo: string = 'Crear cliente';
  public cliente: Cliente = new Cliente();
  public errores: string[];

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCliente();
  }

  public cargarCliente(): void {

    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe(
          (cliente) => {
            this.cliente = cliente;
          },
          (err) => {
            this.errores = err.error.errors as string[];
            console.error('Código de error desde backend: ' + err.status);
            console.error(err.error.errors);
          }
        );
      }
    });
  }

  public create(): void {

    this.clienteService.create(this.cliente).subscribe(
      (cliente) => {
        this.router.navigate(['/clientes']);
        swal(
          'Nuevo cliente',
          `El cliente ${cliente.nombre} ha sido creado con éxito`,
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Código de error desde backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe((json) => {
      this.router.navigate(['/clientes']);
      swal('Clientes Actualizado', `${json.mensaje}: ${json.cliente.nombre}`);
    });
  }
}
