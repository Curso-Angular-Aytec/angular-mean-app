import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    name: ['Test 1', [Validators.required]],
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
              private router: Router) {

  }

  register() {
    console.log(this.miFormulario.value);
    this.router.navigateByUrl('/dashboard');
  }
  
}