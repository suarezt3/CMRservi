import { Component, OnInit, inject } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-login',
  standalone: true,
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
  imports: [ NgZorroModule, ReactiveFormsModule, CommonModule ]
})
export class FormLoginComponent implements OnInit {

  private fb = inject(FormBuilder);
  public formLogin!: FormGroup;

  constructor() { }

  ngOnInit() {

    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }


   /**
   *
   * Para validar los campos del formulario
   * @returns
   */
   invalidField( field: string ) {
    return this.formLogin.get(field)?.invalid
            && this.formLogin.get(field)?.touched;
  }


  submitForm() {
    console.log("Formulario", this.formLogin.value);
  }

}
