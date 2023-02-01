import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  response: any
  userData: any

  constructor(private http: HttpClient, private router: Router) { }

  getData() {

    return this.http.get('http://localhost:5000/profile').subscribe((res) => {

      this.response = res
      this.userData = this.response

    }, (error) => {
      this.router.navigate(["/login"])
      console.log(error);
    });
  }

  ngOnInit() {
    this.getData();
  }

}