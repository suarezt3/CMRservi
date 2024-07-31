import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatosClientesService {

  private http = inject( HttpClient )
  private url = environment.supabaseurl

  public datos: any[] = [] || undefined

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
  * @returns Trae la tabla de los trabajos
  */
getJobs() {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization,
  })
   return this.http.get(`${this.url}/jobs`, {headers}).pipe()
  }


  /**
   *
   * @param body Metodo para enviar el formualario
   * @returns
   */
  createClient(body: {}): Observable<any> {
    let headers = new HttpHeaders({
      'apikey'       : environment.supabaseKey,
      'Authorization': environment.authorization,
      'Content-Type' : 'application/json',
     })
     return this.http.post<any>(`${this.url}/clients`, body, {headers})
  }

   /**
     *
     * @param id Para editar los datos de un cliente
     * @returns
     */
   editClientDocument(id: string, body: {}) {
    let headers = new HttpHeaders({
      'apikey'       : environment.supabaseKey,
      'Authorization': environment.authorization,
      'Content-Type' : 'application/json',
    })

     return this.http.patch(`${this.url}/clients?plate=eq.${id}`, body, {headers}).pipe()
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

   return this.http.get(`${this.url}/clients?plate=eq.${placa}`, {headers}).pipe()
}


 /**
 *
 * @param id Para obtener datos de cada trabajo de un cliente
 * @returns
 */
   getJobsClients(id: string) {
    let headers = new HttpHeaders({
      'apikey'       : environment.supabaseKey,
      'Authorization': environment.authorization,
    })

     return this.http.get(`${this.url}/jobs?plate=eq.${id}`, {headers})
  }


  /**
     *
     * @param body Crear un nuevo trabajo
     * @returns
     */
  createJobs(body: {}): Observable<any> {
    let headers = new HttpHeaders({
      'apikey'       : environment.supabaseKey,
      'Authorization': environment.authorization,
      'Content-Type' : 'application/json',
     })
     return this.http.post<any>(`${this.url}/jobs`, body, {headers})
  }

  /**
 *
 * @returns Para eliminar un trabajo
 */
deleteJobs(order: number) {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization
  })
   return this.http.delete<any>(`${this.url}/jobs?numberOrder=eq.${order}`, {headers}).pipe()
}

  /**
 *
 * @returns Obtener las marcas de vehiculos
 */
getBrandVehicles() {
  let headers = new HttpHeaders({
    'apikey'       : environment.supabaseKey,
    'Authorization': environment.authorization
  })
   return this.http.get<any>(`${this.url}/brands`, {headers}).pipe()
}


/**
 *
 * @returns Obtener los tipos de documentos
 */
getTypeDocuments() {
  return this.http.get<any>('../../assets/type-documents.json')
}

/**
 *
 * @returns Obtener los tipos de trabajo
 */
getTypeJobs() {
  return this.http.get<any>('../../assets/type-jobs.json')
}

}


