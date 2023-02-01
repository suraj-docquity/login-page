import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { patterns } from 'src/app/shared/input.validator';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  loginForm!: FormGroup;
  submitted = false;
  userExists = true;
  resData: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router,private toast: NgToastService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(patterns.email_regex)]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.submitted = true

    if (this.loginForm.invalid) {
      return
    } else {
      let data = this.loginForm.value;
      let data_new = { Email: data.email, Password: data.password };

      this.http.post<Response>("http://localhost:5000/auth/login", data_new).subscribe((res) => {
        this.resData = res
        localStorage.setItem('access_token', this.resData.access_token)

        if (this.resData.status == 200) {
          this.userExists = true;
          this.toast.success({detail:"SUCCESS",summary:'Loggin Successful',duration:3000});
          setTimeout(()=>{ this.router.navigate(["/homepage"]) }, 500)
          
        }

      }, (error) => {
        this.userExists = false
        this.toast.error({detail:"ERROR",summary:'Login Failed',duration:3000});
        console.log(error);
      })
    }
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.loginForm.controls;
  }
}
