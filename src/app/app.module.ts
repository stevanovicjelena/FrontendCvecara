
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations' ;
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';
import { MatCardModule } from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';



import { HomeComponent } from './components/core/home/home.component';
import { KontaktComponent } from './components/core/kontakt/kontakt.component';
import { InfoComponent } from './components/core/info/info.component';
import { CvetniAranzmanComponent } from './components/cvetni-aranzman/cvetni-aranzman.component';
import { CvetComponent } from './components/cvet/cvet.component';
import { LoginComponent } from './components/login/login.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { CvetDialogComponent } from './components/dialogs/cvet-dialog/cvet-dialog.component';
import { VrstaCvetaComponent } from './components/vrsta-cveta/vrsta-cveta.component';
import { CvetniAranzmanDialogComponent } from './components/dialogs/cvetni-aranzman-dialog/cvetni-aranzman-dialog.component';
import { DodatakComponent } from './components/dodatak/dodatak.component';
import { PorudzbinaComponent } from './components/porudzbina/porudzbina.component';
import { PorudzbinaDialogComponent } from './components/dialogs/porudzbina-dialog/porudzbina-dialog.component';
import { KorpaComponent } from './components/korpa/korpa.component';
import { KorisnikComponent } from './components/korisnik/korisnik.component';
import { KorisnikDialogComponent } from './components/dialogs/korisnik-dialog/korisnik-dialog.component';

export function tokenGetter(){
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    KontaktComponent,
    InfoComponent,
    CvetniAranzmanComponent,
    CvetComponent,
    LoginComponent,
    SingUpComponent,
    DodatakComponent,
    CvetDialogComponent,
    VrstaCvetaComponent,
    CvetniAranzmanDialogComponent,
    PorudzbinaComponent,
    PorudzbinaDialogComponent,
    KorpaComponent,
    KorisnikComponent,
    KorisnikDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    HttpClientModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatSortModule,
    MatCardModule,
    MatTabsModule,
    CommonModule,
    MatPaginatorModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44379", "localhost:44265"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
