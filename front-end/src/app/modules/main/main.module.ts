import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { StatsComponent } from './components/stats/stats.component';

@NgModule({
  declarations: [StatsComponent],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
