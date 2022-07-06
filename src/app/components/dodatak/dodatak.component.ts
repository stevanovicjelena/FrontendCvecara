import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { Dodatak } from 'src/app/models/dodatakModel';
import { DodatakService } from 'src/app/services/dodatak.service';

@Component({
  selector: 'app-dodatak',
  templateUrl: './dodatak.component.html',
  styleUrls: ['./dodatak.component.css']
})
export class DodatakComponent implements OnInit, OnDestroy {

  displayedColumns = ['idDodatka', 'bojaDodatka', 'cenaDodatka', 'nazivTipaDodatka', 'opisTipaDodatka', 'actions'];
  dataSource : MatTableDataSource<Dodatak> ;
  subscription : Subscription;
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  dialog : MatDialog
  constructor(private dodatakService : DodatakService, private jwtHelper : JwtHelperService) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


 public loadData(){
    this.dodatakService.getAllDodaci()
    .subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data)
      this.dataSource.filterPredicate = (data:any, filter: string) => {
        const accumulator = (currentTerm: any, key: any) => {
          return key === 'tipDodatka' ? currentTerm + data.tipDodatka.nazivTipaDodatka: currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data:any, property) => {
        switch (property) {
          case 'nazivTipaDodatka': return data.tipDodatka.nazivTipaDodatka.toLocaleLowerCase();
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

  public openDialog(flag: number, idCvetnogAranzmana ?: number, nazivAranzmana ?: string, cenaAranzmana ?: number, opisAranzmana ?: string ){

  }

  public shop(){

  }

  selectRow(row: any){

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


  }
