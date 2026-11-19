import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-confirm-modal',
  styleUrl: './confirm-modal.css',
  templateUrl: './confirm-modal.html',
})
export class ConfirmModal {

  @Input() titulo: string = 'Confirmar acción';
  @Input() mensaje: string = '¿Estás seguro?';
  @Input() textoConfirmar: string = 'Aceptar';
  @Input() textoCancelar: string = 'Cancelar';

  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();


}
