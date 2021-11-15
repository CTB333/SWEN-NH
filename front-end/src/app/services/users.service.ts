import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'application/json',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  login(form: FormGroup): Observable<any> {
    let url = this.apiUrl + '/users/login';
    let json = JSON.stringify(form);
    return this.http.post<any>(url, json, httpOptions);
  }

  register(form: FormGroup): Observable<any> {
    let url = this.apiUrl + '/users/register';
    let json: any = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    };
    console.log(json);
    return this.http.post<any>(url, json, httpOptions);
  }

  loggedIn(): Promise<boolean> {
    let url = this.apiUrl + '/users/loggedIn';
    let token = this.getToken();
    let data = {
      jwt: token,
    };
    return this.http.post<any>(url, data, httpOptions).toPromise();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getUser(): Observable<any> {
    let token = this.getToken();
    let data = {
      jwt: token,
    };
    let url = this.apiUrl + '/users/get';
    return this.http.post<any>(url, data, httpOptions);
  }

  updateUser(data: any): Observable<any> {
    let url = this.apiUrl + '/users/update';
    let token = this.getToken();
    let post_data = {
      stats: data.stats,
      notif: data.notif,
      identity: data.identity,
      jwt: token,
    };
    return this.http.post<any>(url, post_data, httpOptions);
  }

  deleteUser(): Observable<any> {
    let token = this.getToken();
    let url = this.apiUrl + '/users/delete';
    return this.http.post<any>(url, { token }, httpOptions);
  }
}
