import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from './services/users.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  loggedIn: Boolean;
  constructor(private usersService: UsersService, private router: Router) {}
  status: boolean;
  async canActivate() {
    this.status = await this.usersService.loggedIn();
    if (this.status) {
      this.router.navigate(['menu']);
      return false;
    } else {
      return true;
    }
  }
}
