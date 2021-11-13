import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { LoginGuard } from 'src/app/login.guard';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { SignupComponent } from './components/signup/signup.component';
import { StatsComponent } from './components/stats/stats.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: 'home', component: ButtonsComponent },
      { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
      { path: 'signup', component: SignupComponent, canActivate: [LoginGuard] },
      { path: '', redirectTo: '/menu/home', pathMatch: 'full' },
      {
        path: 'stats',
        component: StatsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
