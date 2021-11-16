import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { StatsComponent } from './components/stats/stats.component';
import { UserStatsComponent } from './components/user-stats/user-stats.component';

@NgModule({
  declarations: [StatsComponent, UserStatsComponent],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
