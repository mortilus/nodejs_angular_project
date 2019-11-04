import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './authorisation/register/register.component';
import { LoginComponent } from './authorisation/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    EditPageComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
