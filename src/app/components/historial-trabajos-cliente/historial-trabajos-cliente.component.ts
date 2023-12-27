import { Component, Input, OnInit } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';

@Component({
  selector: 'app-historial-trabajos-cliente',
  standalone: true,
  imports: [NgZorroModule],
  templateUrl: './historial-trabajos-cliente.component.html',
  styleUrl: './historial-trabajos-cliente.component.css'
})
export class HistorialTrabajosClienteComponent implements OnInit {

  @Input() trabajosCliente!: any;


  ngOnInit(): void {

  }

}
