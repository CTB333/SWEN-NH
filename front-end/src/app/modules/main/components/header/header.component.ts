import { Component, OnInit } from '@angular/core';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  chart = faChartBar;
  isLoggedIn: Boolean;

  constructor(private usersService: UsersService) {}

  onClick() {
    this.usersService.logOut();
  }

  async ngOnInit() {
    this.isLoggedIn = await this.usersService.loggedIn();
    console.log('Header:', this.isLoggedIn);
  }
}
