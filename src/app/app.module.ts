import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatsocketComponent } from './chatsocket/chatsocket.component';
import { PricingComponent } from './pricing/pricing.component'; 
@NgModule({
  declarations: [
    AppComponent,
    VideoComponent,
    ChatsocketComponent,
    PricingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
