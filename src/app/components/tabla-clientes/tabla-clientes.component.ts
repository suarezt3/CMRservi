import { Component, OnInit, inject, signal } from '@angular/core';
import { DatosClientesService } from '../../services/datos-clientes.service';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tabla-clientes',
  standalone: true,
  templateUrl: './tabla-clientes.component.html',
  styleUrl: './tabla-clientes.component.css',
  imports: [ NgZorroModule, FormsModule ],
})
export class TablaClientesComponent implements OnInit {

  public searchValue = '';
  public visible = false;



  public datosClientes: any[] = []
  private DatosClientesService = inject( DatosClientesService )


  constructor( ) {}


  ngOnInit() {
    this.DatosClientesService.getClientes().subscribe((resp: any) => {
      this.datosClientes = resp
      console.log("DATOS", this.datosClientes);
    });
  }


  reset(): void {
    this.searchValue = '';
    this.search();
    this.DatosClientesService.getClientes().subscribe((resp: any) => {
      this.datosClientes = resp
      console.log("DATOS", this.datosClientes);
    });
  }

  search(): void {
    this.visible = false;
    this.datosClientes = this.datosClientes.filter((item: any) => item.name.indexOf(this.searchValue.toUpperCase()) !== -1);
  }


}
