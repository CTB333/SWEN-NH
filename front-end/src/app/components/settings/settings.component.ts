import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  isLoggedIn: Boolean = false;
  stats: Boolean = false;
  identity: Boolean = false;
  notifications: Boolean = false;

  constructor(private usersService: UsersService) {
    // this.usersService.loggedIn().subscribe((result) => {
    //   console.log('result', result);
    //    = result;
    // });
    if (this.isLoggedIn) {
      console.log(this.isLoggedIn);
      this.usersService.getUser().subscribe((res) => {
        this.stats = res.user.stats;
        this.identity = res.user.identity;
        this.notifications = res.user.notifications;
      });
    }
  }

  async ngOnInit() {
    this.isLoggedIn = await this.usersService.loggedIn();
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

  saveChanges() {
    let data = {
      stats: this.stats,
      identity: this.identity,
      notif: this.notifications,
    };
    this.usersService.updateUser(data).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
