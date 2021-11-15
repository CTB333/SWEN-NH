import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/services/users.service';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  errorMessage: Boolean = false;
  success: Boolean = false;
  successMessage: String;

  backBtn = faBackward;

  isLoggedIn: Boolean;

  stats: Boolean = false;
  identity: Boolean = false;
  notifications: Boolean = false;

  membership: Number = 0;
  donationForm = new FormGroup({
    donation: new FormControl('0.00'),
  });

  constructor(private usersService: UsersService, private router: Router) {}

  async ngOnInit() {
    this.isLoggedIn = await this.usersService.loggedIn();
    if (this.isLoggedIn) {
      this.usersService.getUser().subscribe((res) => {
        this.stats = res.user.stats;
        this.identity = res.user.identity;
        this.notifications = res.user.notifications;
      });
    } else {
      this.router.navigate(['menu']);
    }
  }

  changeSuccess(value: boolean) {
    this.success = value;
  }

  changeError(value: boolean) {
    this.errorMessage = value;
  }

  changeStatus(value: number) {
    switch (value) {
      case 0:
        this.stats = !this.stats;
        break;
      case 1:
        this.identity = !this.identity;
        break;
      case 2:
        this.notifications = !this.notifications;
        break;
    }
  }

  changeMembership(value: Number) {
    this.membership = value;
  }

  deleteAccount() {
    this.usersService.deleteUser().subscribe(
      (res) => {
        if (res.success) {
          this.isSuccess('User Deleted');
          this.usersService.logOut();
          return;
        }
        this.isError();
        return;
      },
      (err) => {
        this.isError();
      }
    );
  }

  donate() {
    let value = this.donationForm.value.donation;
    this.errorMessage = true;
  }

  isError() {
    this.success = false;
    this.successMessage = '';
    this.errorMessage = true;
  }

  isSuccess(message: string) {
    this.errorMessage = false;
    this.successMessage = message;
    this.success = true;
  }

  saveChanges() {
    let data = {
      stats: this.stats,
      identity: this.identity,
      notif: this.notifications,
    };
    this.usersService.updateUser(data).subscribe(
      (res) => {
        if (res.success) {
          this.isSuccess('Settings saved successfully');
          this.usersService.logOut();
          return;
        }
        this.isError();
        return;
      },
      (err) => {
        this.isError();
        return;
      }
    );
  }
}
