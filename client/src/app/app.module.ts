import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

// BOOTSTRAP JS
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './header/header.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { VacationModalComponent } from './vacation-modal/vacation-modal.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { SessionComponent } from './session/session.component';

import { VacationService } from './vacation.service';
import { UserService } from './user.service';
import { SessionErrorComponent } from './errors/session-error/session-error.component';
import { AdminErrorComponent } from './errors/admin-error/admin-error.component';
import { UsersOnlyErrorComponent } from './errors/users-only-error/users-only-error.component';
import { StillLoggedErrorComponent } from './errors/still-logged-error/still-logged-error.component';
import { NotFoundErrorComponent } from './errors/not-found-error/not-found-error.component';
import { HotspotComponent } from './hotspot/hotspot.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'admin', component: AdminMainComponent },
  { path: 'admin/reports', component: BarChartComponent },
  { path: 'session', component: SessionComponent},
  { path: 'error/session_error', component: SessionErrorComponent},
  { path: 'error/admin_error', component: AdminErrorComponent},
  { path: 'error/users_only_error', component: UsersOnlyErrorComponent },
  { path: 'error/still_logged_error', component: StillLoggedErrorComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', component: NotFoundErrorComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    HeaderComponent,
    AdminMainComponent,
    VacationModalComponent,
    BarChartComponent,
    SessionComponent,
    SessionErrorComponent,
    AdminErrorComponent,
    UsersOnlyErrorComponent,
    StillLoggedErrorComponent,
    NotFoundErrorComponent,
    HotspotComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    AlertModule.forRoot(),
    ChartsModule
  ],
  providers: [VacationService, UserService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
