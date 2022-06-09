import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { CreateAreasComponent } from './components/create-areas/create-areas.component';
import { ConsultAreaComponent } from './components/consult-area/consult-area.component';
import { ConsultEmployeesComponent } from './components/consult-employees/consult-employees.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'edit-user/:id', component: CreateUserComponent },
  { path: 'create-area', component: CreateAreasComponent },
  { path: 'edit-area/:id', component: CreateAreasComponent },
  { path: 'consult-area', component: ConsultAreaComponent },
  { path: 'consult-employees', component: ConsultEmployeesComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
