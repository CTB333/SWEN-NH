import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './services/users.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}
  status: boolean;
  async canActivate(): Promise<boolean> {
    this.status = await this.usersService.loggedIn();
    return this.status;
  }
}
