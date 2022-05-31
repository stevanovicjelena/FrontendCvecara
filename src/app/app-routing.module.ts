import { DodatakComponent } from './components/dodatak/dodatak.component';
import { HomeComponent } from './components/core/home/home.component';
import { KontaktComponent } from './components/core/kontakt/kontakt.component';
import { InfoComponent } from './components/core/info/info.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { PorudzbinaComponent } from './components/porudzbina/porudzbina.component';
import { LoginComponent } from './components/login/login.component';
import { CvetniAranzmanComponent } from './components/cvetni-aranzman/cvetni-aranzman.component';
import { CvetComponent } from './components/cvet/cvet.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path : 'cvet', component : CvetComponent},
  {path: 'cvetni-aranzman', component: CvetniAranzmanComponent},
  {path: 'dodatak', component: DodatakComponent},
  {path: 'login', component : LoginComponent},
  {path: 'porudzbina', component: PorudzbinaComponent},
  {path: 'sing-up', component: SingUpComponent},
  {path: 'info', component: InfoComponent},
  {path: 'kontakt', component: KontaktComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
