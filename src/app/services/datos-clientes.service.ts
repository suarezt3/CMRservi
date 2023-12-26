import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CLIENTE } from '../interfaces/CLIENTE';

@Injectable({
  providedIn: 'root'
})
export class DatosClientesService {

  private http = inject( HttpClient )
  private url = environment.supabaseurl

  public datos: CLIENTE[] = [] || undefined

  constructor() { }


  /**
 *
 * @returns Trae la tabla de los clientes
 */
  getClientes() {
    let headers = new HttpHeaders({
      'apikey'       : environment.supabaseKey,
      'Authorization': environment.authorization
    })
     return this.http.get(`${this.url}/clients`, {headers}).pipe()
}



/**
 *
 * @param placa Para obtener datos de un cliente por medio de la placa
 * @returns
 */
getClientPlate(placa: string) {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization,
  })

   return this.http.get(`${this.url}/clients?plate=eq.${placa}`, {headers}).subscribe((resp: any) => {
    this.datos = resp[0]
   })
}

}
