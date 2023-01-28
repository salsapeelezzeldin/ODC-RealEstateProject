import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { IndexComponent } from './pages/index/index.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { AllRolesComponent } from './pages/roles/all-roles/all-roles.component';
import { AddRoleComponent } from './pages/roles/add-role/add-role.component';
import { EditRoleComponent } from './pages/roles/edit-role/edit-role.component';
import { SingleRoleComponent } from './pages/roles/single-role/single-role.component';
import { SingleUrlComponent } from './pages/urls/single-url/single-url.component';
import { AllUrlsComponent } from './pages/urls/all-urls/all-urls.component';
import { AddUrlComponent } from './pages/urls/add-url/add-url.component';
import { EditUrlComponent } from './pages/urls/edit-url/edit-url.component';
import { ErrorComponent } from './pages/error/error.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AllProjectsComponent } from './pages/projects/all-projects/all-projects.component';
import { ProfileComponent } from './pages/users/user-profile/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    IndexComponent,
    ContactComponent,
    LoginComponent,
    AllRolesComponent,
    AddRoleComponent,
    EditRoleComponent,
    SingleRoleComponent,
    SingleUrlComponent,
    AllUrlsComponent,
    AddUrlComponent,
    EditUrlComponent,
    ErrorComponent,
    AllProjectsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS ,
      useClass : AuthInterceptor ,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
