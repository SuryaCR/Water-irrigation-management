import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DataViewComponent } from './data-view/data-view.component';
import { WaterManageComponent } from './water-manage/water-manage.component';
import { IrrigationManageComponent } from './irrigation-manage/irrigation-manage.component';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [ { path: '', component: HomeComponent },
{path:'home',component:HomeComponent},
{ path: 'signup', component: SignupComponent },
{path:'login',component:LoginComponent},
{ path: 'dataview', component: DataViewComponent },
{ path: 'userdata', component: IrrigationManageComponent },
{ path: 'watermanage', component: WaterManageComponent },
{ path: 'additionalinfo', component: AdditionalInfoComponent },
{ path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
