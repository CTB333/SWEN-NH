import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
})
export class ButtonsComponent implements OnInit {
  isLoggedIn: Boolean;
  constructor(private usersService: UsersService) {}

  async ngOnInit() {
    this.isLoggedIn = await this.usersService.loggedIn();
    console.log('Header:', this.isLoggedIn);
  }
}
