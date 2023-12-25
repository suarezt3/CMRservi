import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { FormsModule } from '@angular/forms';
import { DatosClientesService } from '../../services/datos-clientes.service';
import { CLIENTE } from '../../interfaces/CLIENTE';

@Component({
  selector: 'app-search-name',
  standalone: true,
  imports: [NgZorroModule, FormsModule],
  templateUrl: './search-name.component.html',
  styleUrl: './search-name.component.css'
})
export class SearchComponent implements OnInit {


  public    searchValue = '';
  public    visible = false;
  @Input()  Data: CLIENTE[] = [] || undefined;
  @Output() ResultadoBuscador = new EventEmitter();

  private DatosClientesService = inject( DatosClientesService )

  constructor() {}

  ngOnInit(): void {

  }

  reset(): void {
    this.searchValue = '';
    this.search();
    this.DatosClientesService.getClientes().subscribe((resp: any) => {
      this.Data = resp
      this.ResultadoBuscador.emit(this.Data)
    });
  }

  search(): void {
    this.visible = false;
    this.Data = this.Data.filter((item: any) => item.name.indexOf(this.searchValue.toUpperCase()) !== -1);
    this.ResultadoBuscador.emit(this.Data)
  }


}
