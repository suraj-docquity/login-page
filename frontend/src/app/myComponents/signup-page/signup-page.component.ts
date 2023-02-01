import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { patterns } from 'src/app/shared/input.validator';
import { __values } from 'tslib';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {

  registerForm!: FormGroup;
  submitted = false;

  response: any
  message: any
  isRegistered: any

  constructor(private fromBuilder: FormBuilder, private http: HttpClient, private router: Router,private toast: NgToastService) { }

  ngOnInit() {
    this.registerForm = this.fromBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(patterns.phone_regex)]],
      email: ['', [Validators.required, Validators.pattern(patterns.email_regex)]],
      password: ['', [Validators.required, Validators.pattern(patterns.pass_regex)]],

    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return
    } else {
      let data = this.registerForm.value;
      let data_new = { Name: data.name, Username: data.username, Email: data.email, Phone: data.phone, Password: data.password };

      this.http.post("http://localhost:5000/user", data_new).subscribe((res) => {

        this.response = res
        if (this.response.status == 409) {
          this.toast.warning({detail:"WARN",summary:'User Already Exists',duration:3000});
          this.isRegistered = true
        } else {
          this.toast.success({detail:"SUCCESS",summary:'Registration Successful',duration:3000});
          setTimeout(()=>{ this.router.navigate(["/login"]) }, 500)
        }

      }, (error) => {
        this.toast.error({detail:"ERROR",summary:'Registration Failed',duration:3000});
        console.log(error);
      })
    }

  }

  get form(): { [key: string]: AbstractControl; } {
    return this.registerForm.controls;
  }

}
