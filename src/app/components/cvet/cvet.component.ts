
import { Cvet } from 'src/app/models/cvetModel';
import { VrstaCveta } from './../../models/vrstaCvetaModel';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CvetServiceService } from 'src/app/services/cvet.service';
import { isObservable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CvetDialogComponent } from '../dialogs/cvet-dialog/cvet-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-cvet',
  templateUrl: './cvet.component.html',
  styleUrls: ['./cvet.component.css']
})
export class CvetComponent implements OnInit, OnDestroy {

  displayedColumns = ['idCveta', 'bojaCveta', 'cenaCveta', 'nazivVrste', 'opisVrste','actions'];
  dataSource : MatTableDataSource<Cvet> ;
  selektovaniCvet : Cvet;
  subscription : Subscription;
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(private cvetService : CvetServiceService, private dialog: MatDialog, private jwtHelper : JwtHelperService) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


 public loadData(){
    this.cvetService.getAllCvetovi()
    .subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    //  console.log(data)
      this.dataSource.filterPredicate = (data:any, filter: string) => {
        const accumulator = (currentTerm: any, key: any) => {
          return key === 'vrstaCveta' ? currentTerm + data.vrstaCveta.nazivVrste: currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data:any, property) => {
        switch (property) {
          case 'nazivVrste': return data.vrstaCveta.nazivVrste.toLocaleLowerCase();
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

  isRole = (): boolean => {
    const uloga = localStorage.getItem("uloga");

    if(uloga == "Kupac"){
      return true;
    }
    return false;
  }

  public openDialog(flag: number, cvetID ?: number, bojaCveta ?: string, cenaCveta ?: number, vrstaCveta ?: VrstaCveta, vrstaCvetaID ?: number ){
    const dialogRef = this.dialog.open(CvetDialogComponent, {data: {cvetID, bojaCveta, cenaCveta, vrstaCveta, vrstaCvetaID}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(result => {
        if(result===1) {
          this.loadData();
        }
      })
  }

  public shop(){

  }

  selectRow(row: any){
    this.selektovaniCvet = row;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)){

      return true;
    }

    return false;
  }
   // this.http.get("http://localhost:44265/api/cvet")
   // .subscribe({
   //   next: (result: any) => this.cvetovi = result,
   //   error: (err: HttpErrorResponse) => console.log(err)
   // }
   // )
  }


