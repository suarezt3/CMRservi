import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidatorPlateService implements AsyncValidator {

  private APIURL: string = environment.supabaseurl
  private http = inject(HttpClient)


    validate( control: AbstractControl): Observable<ValidationErrors | null> {
      let headers = new HttpHeaders({
        'apikey'       : environment.supabaseKey,
        'Authorization': environment.authorization,
      })
    const plate = control.value.toUpperCase();
    return this.http.get<any[]>(`${this.APIURL}/clients?plate=eq.${ plate }`, {headers})
                .pipe(
                  // delay(3000),
                  map( resp => {
                    return ( resp.length === 0 )
                        ? null
                        : { plateExist: 'Esta placa ya existe en la base de datos' }
                  })
                );

  }
}
