import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css'],
})
export class DirectivaComponent {
  listaCurso: string[] = ['typescript', 'javascript', 'java', 'c#', 'PHP'];
  habilitar: boolean = true;
  renderBoton: string = 'Ocultar';

  constructor() {}

  setHabilitar(): void {

    if (this.habilitar) {
      this.habilitar = false;
      this.renderBoton = 'Mostrar';
    } else {
      this.habilitar = true;
      this.renderBoton = 'Ocultar';
    }
  }
}
