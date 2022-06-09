import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import{MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DataViewComponent } from './data-view/data-view.component';
import { WaterManageComponent } from './water-manage/water-manage.component';

import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { IrrigationManageComponent } from './irrigation-manage/irrigation-manage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IntercepterService } from './intercepter.service';

import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { AboutComponent } from './about/about.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DataViewComponent,
    WaterManageComponent,
    AdditionalInfoComponent,
    IrrigationManageComponent,
    DashboardComponent,
    AboutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
    NgxSpinnerModule,
   
  ],
  providers: [{provide: HTTP_INTERCEPTORS,
    useClass: IntercepterService,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
