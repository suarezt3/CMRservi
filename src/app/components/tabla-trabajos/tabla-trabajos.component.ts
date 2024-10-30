import { Component, OnInit, inject } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { DatosClientesService } from '../../services/datos-clientes.service';
import { Trabajo } from '../../interfaces/trabajos';
import { CommonModule } from '@angular/common';
import { SearchPlacaComponent } from '../search-placa/search-placa.component';

@Component({
  selector: 'app-tabla-trabajos',
  standalone: true,
  imports: [NgZorroModule, CommonModule],
  templateUrl: './tabla-trabajos.component.html',
  styleUrl: './tabla-trabajos.component.css'
})

export class TablaTrabajosComponent implements OnInit {

  public trabajos: Trabajo[] = [] || undefined
  public brands: any[] = [] || undefined //TEMPORAL
  public typeJobs: any[] = [] || undefined //TEMPORAL

  private DatosClientesService = inject( DatosClientesService );


  ngOnInit() {

    this.DatosClientesService.getJobs().subscribe((resp: any) => {
      console.log("TRABAJOS", resp);
      this.trabajos = resp

    })

  }



}
