import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from './services/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {}

  canActivate(): Observable<Boolean> {
    // return this.usersService.loggedIn().pipe(Map(e) => {
    //   if(e) {
    //     return true
    //   }
    // })
    // if (this.usersService.loggedIn()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/menu/login']);
    //   return false;
    // }
  }
}
