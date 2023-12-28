import { Component, Input, OnInit } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial-trabajos-cliente',
  standalone: true,
  imports: [NgZorroModule, CommonModule],
  templateUrl: './historial-trabajos-cliente.component.html',
  styleUrl: './historial-trabajos-cliente.component.css'
})
export class HistorialTrabajosClienteComponent implements OnInit {

  @Input() trabajosCliente!: any;
  public textDate: string = "Siguiente "

  ngOnInit(): void {

  }

}
