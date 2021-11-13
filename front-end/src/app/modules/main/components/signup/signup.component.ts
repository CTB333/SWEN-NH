import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
  });

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (
      this.registerForm.value.password != this.registerForm.value.rePassword
    ) {
      console.log('Passwords do not match');
      console.log(this.registerForm.value.password);
      console.log(this.registerForm.value.rePassword);
      return;
    }
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/']);
          return;
        },
        (error) => {
          console.log('error:', error);
          return;
        }
      );
    }
  }
}
