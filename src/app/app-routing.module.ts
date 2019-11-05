import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './authorisation/register/register.component';
import { LoginComponent } from './authorisation/login/login.component';
import { NewPostComponent } from './home/new-post/new-post.component';
import { AuthGuardService } from './guards/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', canActivate: [AuthGuardService], component: HomeComponent },
  { path: 'newpost', canActivate: [AuthGuardService], component: NewPostComponent },
  { path: 'edit/:id', canActivate: [AuthGuardService], component: EditPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
