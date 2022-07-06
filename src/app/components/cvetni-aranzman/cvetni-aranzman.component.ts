import { Porudzbina } from 'src/app/models/porudzbinaModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pakovanje } from './../../models/pakovanjeModel';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { CvetniAranzman } from 'src/app/models/cvetniAranzmanModel';
import { CvetniAranzmanServiceService } from 'src/app/services/cvetni-aranzman-service.service';
import { CvetniAranzmanDialogComponent } from '../dialogs/cvetni-aranzman-dialog/cvetni-aranzman-dialog.component';
import { PorudzbinaDialogComponent } from '../dialogs/porudzbina-dialog/porudzbina-dialog.component';
import { LokacijaModel } from 'src/app/models/lokacijaModel';
import { UserModel } from 'src/app/models/userModel';

@Component({
  selector: 'app-cvetni-aranzman',
  templateUrl: './cvetni-aranzman.component.html',
  styleUrls: ['./cvetni-aranzman.component.css']
})
export class CvetniAranzmanComponent implements OnInit, OnDestroy {

  displayedColumns = ['idCvetnogAranzmana', 'nazivAranzmana', 'cenaAranzmana', 'opisAranzmana', 'pakovanje', 'actions'];
  dataSource : MatTableDataSource<CvetniAranzman> ;
  subscription : Subscription;
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  dialog : MatDialog
  selektovanCvetniAranzman : CvetniAranzman;
  aranzmani : CvetniAranzman[];
  porudzbina : Porudzbina;

  constructor(private cvetniAranzmanService : CvetniAranzmanServiceService,
              private jwtHelper : JwtHelperService,
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy() : void{
    this.subscription.unsubscribe();
  }

  public loadData(){
    this.cvetniAranzmanService.getAllCvetniAranzmani()
    .subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data)
      this.dataSource.filterPredicate = (data:any, filter: string) => {
        const accumulator = (currentTerm: any, key: any) => {
          return key === 'naziv' ? currentTerm + data.nazivAranzmana: currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data:any, property) => {
        switch (property) {
          case 'naziv': return data.nazivAranzmana.toLocaleLowerCase();
          default: return data[property];
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }

  }

public openDialog(flag: number, idCvetnogAranzmana ?: number, nazivAranzmana ?: string, cenaAranzmana ?: number, opisAranzmana ?: string, kolicina ?: number, pakovanje ?: Pakovanje ){
    const dialogRef = this.dialog.open(CvetniAranzmanDialogComponent, {data : {idCvetnogAranzmana, nazivAranzmana, cenaAranzmana, opisAranzmana, kolicina, pakovanje}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
    .subscribe(result => {
      if (result==1){
        this.loadData;
      }
    })
  }

  selectRow(row: any) {

    this.selektovanCvetniAranzman = row;

  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }


  shop(cvetniAranzman : CvetniAranzman){

      localStorage.setItem("aranzmani", JSON.stringify(cvetniAranzman))

      this.snackBar.open('Uspesno dodat cvetni aranzman u korpu:', 'U redu', {
        duration: 2500
        });

      console.log('Dodato u korpu')
      console.log(JSON.parse(localStorage.getItem("aranzmani")!))
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)){

      return true;
    }

    return false;
  }

  isRole = (): boolean => {
    const uloga = localStorage.getItem("uloga");

    if(uloga == "Kupac"){
      return true;
    }
    return false;
  }
/*
  public createPorudzbina(flag: number, cvetniAranzman : CvetniAranzman,kolicina ?: number, cenaPorudzbine ?: number, statusPorudzbine ?: string, lokacija ?: LokacijaModel, kupac?: UserModel, zaposleni ?: UserModel ){
    this.porudzbina = new Porudzbina();

    this.porudzbina.kupacID = JSON.parse(localStorage.getItem("id")!)

    this.porudzbina.cvetniAranzman = cvetniAranzman;

    console.log(this.porudzbina)

    const dialogRef = this.dialog.open(PorudzbinaDialogComponent, {data: {idPorudzbine : this.porudzbina.porudzbinaID, nazivAranzmana : this.porudzbina.cvetniAranzman.nazivAranzmana, kolicina, cenaPorudzbine, statusPorudzbine, lokacija, kupac, zaposleni}});
    dialogRef.componentInstance.flag = flag;


  }*/




}
