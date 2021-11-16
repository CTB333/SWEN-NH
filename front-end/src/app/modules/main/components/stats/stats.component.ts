import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  users: Array<any> = [];

  constructor(private usersService: UsersService) {
    this.usersService.getAllUsers().subscribe((res) => {
      this.users = res.users;
    });
  }

  ngOnInit(): void {}
}
