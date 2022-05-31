
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
import { HomeComponent } from './components/core/home/home.component';
import { KontaktComponent } from './components/core/kontakt/kontakt.component';
import { InfoComponent } from './components/core/info/info.component';
import { CvetniAranzmanComponent } from './components/cvetni-aranzman/cvetni-aranzman.component';
import { CvetComponent } from './components/cvet/cvet.component';
import { PorudzbinaComponent } from './components/porudzbina/porudzbina.component';
import { LoginComponent } from './components/login/login.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { DodatakComponent } from './components/dodatak/dodatak.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { CvetDialogComponent } from './components/dialogs/cvet-dialog/cvet-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VrstaCvetaComponent } from './components/vrsta-cveta/vrsta-cveta.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CvetniAranzmanDialogComponent } from './components/dialogs/cvetni-aranzman-dialog/cvetni-aranzman-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    KontaktComponent,
    InfoComponent,
    CvetniAranzmanComponent,
    CvetComponent,
    PorudzbinaComponent,
    LoginComponent,
    SingUpComponent,
    DodatakComponent,
    CvetDialogComponent,
    VrstaCvetaComponent,
    CvetniAranzmanDialogComponent
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
    MatPaginatorModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
