import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatsocketComponent } from './chatsocket/chatsocket.component';
import { PricingComponent } from './pricing/pricing.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  {path:'',component:VideoComponent},
  {path:'chat',component:ChatsocketComponent},
  {path:'pricing',component:PricingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
