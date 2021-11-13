import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from './services/users.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  loggedIn: Boolean;
  constructor(private usersService: UsersService, private router: Router) {}

  canActivate() {
    console.log('login guard');
    this.loggedIn = this.usersService.status;
    console.log(this.loggedIn);
    if (!this.loggedIn) {
      return true;
    } else {
      this.router.navigate(['/menu']);
      return false;
    }
  }
}
