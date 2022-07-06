import { UserService } from './../../services/user.service';
import { UserModel } from './../../models/userModel';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { KorisnikDialogComponent } from '../dialogs/korisnik-dialog/korisnik-dialog.component';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html',
  styleUrls: ['./korisnik.component.css']
})
export class KorisnikComponent implements OnInit {

  displayedColumns = ['userID','imePrezime', 'telefonUser', 'emailUser', 'korisnickoImeUser', 'lozinkaUser', 'uloga', 'actions'];
  dataSource : MatTableDataSource<UserModel> ;
  selektovaniKorisnik : UserModel;
  subscription : Subscription;
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  idUser : number;

  constructor(private userService : UserService , private dialog: MatDialog, private jwtHelper : JwtHelperService) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    if (!this.isRole()) {
      this.loadAllUsers();
    } else {
      const id = localStorage.getItem("id");
      var kupac = JSON.parse(id!);
      console.log(kupac)
      this.loadUserByID(kupac);
    }
  }

 public loadAllUsers(){
    this.userService.getAllUsers()
    .subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data)
      this.dataSource.filterPredicate = (data:any, filter: string) => {
        const accumulator = (currentTerm: any, key: any) => {
          return key === 'username' ? currentTerm + data.korisnickoImeUser: currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data:any, property) => {
        switch (property) {
          case 'username': return data.korisnickoImeUser.toLocaleLowerCase();
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

public loadUserByID(id : number){
  this.userService.getUserByID(id)
    .subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data)

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

  public openDialog(flag: number, idUser ?: number, imeUser?: string, prezimeUser ?: string, telefonUser ?: string, emailUser ?: string, korisnickoImeUser ?: string, lozinkaUser?: string, uloga ?: string){
    const dialogRef = this.dialog.open(KorisnikDialogComponent, {data: {idUser, imeUser, prezimeUser, telefonUser, emailUser, korisnickoImeUser, lozinkaUser, uloga }});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(result => {
        if(result===1) {
          this.loadData();
        }
      })
  }

  selectRow(row: any){
    this.selektovaniKorisnik = row;
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
