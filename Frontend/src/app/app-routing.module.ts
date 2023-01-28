import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { AllProjectsComponent } from './pages/projects/all-projects/all-projects.component';
import { ProfileComponent } from './pages/users/user-profile/profile/profile.component';

const routes: Routes = [
  {path:'' , component: IndexComponent},
  {path:'login' , component: LoginComponent},
  {path:'me' , component: ProfileComponent},
  {path:'projects' , component: AllProjectsComponent},
  // {path:'projects/:projectId' , component: SingleProjectComponent },
  {path:"**" , component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
