import { KorisnikComponent } from './components/korisnik/korisnik.component';
import { KorpaComponent } from './components/korpa/korpa.component';
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
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path : 'cvet', component : CvetComponent, canActivate:[AuthGuard]},
  {path: 'cvetni-aranzman', component: CvetniAranzmanComponent,canActivate: [AuthGuard]},
  {path: 'dodatak', component: DodatakComponent},
  {path: 'login', component : LoginComponent},
  {path: 'sing-up', component: SingUpComponent},
  {path: 'info', component: InfoComponent},
  {path: 'kontakt', component: KontaktComponent},
  {path: 'home', component: HomeComponent},
  {path: 'porudzbina', component : PorudzbinaComponent},
  {path: 'korpa', component: KorpaComponent, canActivate:[AuthGuard]},
  {path: 'korisnik', component: KorisnikComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
