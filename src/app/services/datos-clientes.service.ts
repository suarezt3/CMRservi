import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatosClientesService {

  //private http = Inject( HttpClient )
  private url = environment.supabaseurl

  constructor(private http: HttpClient) { }


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


}
