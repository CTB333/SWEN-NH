import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css'],
})
export class UserStatsComponent implements OnInit {
  @Input() user: any;

  constructor() {}

  ngOnInit(): void {}
}
