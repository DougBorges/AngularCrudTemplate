import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//import { fakeBackendProvider } from '@app/helpers';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AlertComponent } from '@app/alert';
import { HomeComponent } from '@app/home';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent
  ],
  //providers: [
  //  fakeBackendProvider
  //],
  bootstrap: [AppComponent]
})
export class AppModule { };