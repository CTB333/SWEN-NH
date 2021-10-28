import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { User } from '../User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/x-www-form-urlencoded',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  login(form: FormGroup): Observable<any> {
    let url = this.apiUrl + '/users/login';
    let json = JSON.stringify(form);
    return this.http.post<User[]>(url, json, httpOptions);
  }

  register(form: FormGroup): Observable<any> {
    let url = this.apiUrl + '/users/register';
    let json: any = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    };
    console.log(json);
    return this.http.post<User>(url, json, httpOptions);
  }
}
