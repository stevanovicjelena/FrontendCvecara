import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from './../../models/userModel';
import { LokacijaModel } from './../../models/lokacijaModel';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { Porudzbina } from 'src/app/models/porudzbinaModel';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';
import { PorudzbinaDialogComponent } from '../dialogs/porudzbina-dialog/porudzbina-dialog.component';

@Component({
  selector: 'app-porudzbina',
  templateUrl: './porudzbina.component.html',
  styleUrls: ['./porudzbina.component.css']
})
export class PorudzbinaComponent implements OnInit, OnDestroy {

  displayedColumns = ['idPorudzbine', 'nazivAranzmana', 'kolicina', 'cenaPorudzbine', 'statusPorudzbine', 'lokacija', 'kupac', 'zaposleni', 'actions'];
  dataSource : MatTableDataSource<Porudzbina> ;
  selektovanaPorudzbina : Porudzbina;
  subscription : Subscription;
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  idKupca : number;
  handler : any;

  constructor(private porudzbinaService : PorudzbinaService , private dialog: MatDialog, private jwtHelper : JwtHelperService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
    this.loadStripe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public loadData(){
    if (!this.isRole()) {
      this.loadAllPorudzbine();
    } else {
      const id = localStorage.getItem("id");
      var kupac = JSON.parse(id!);
      console.log(kupac)
      this.loadPorudzbinaByKorisnik(kupac);
    }
  }

 public loadAllPorudzbine(){
    this.porudzbinaService.getAllPorudzbine()
    .subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    //  console.log(data)
      this.dataSource.filterPredicate = (data:any, filter: string) => {
        const accumulator = (currentTerm: any, key: any) => {
          return key === 'statusPorudzbine' ? currentTerm + data.statusPorudzbine: currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data:any, property) => {
        switch (property) {
          case 'statusPorudzbine': return data.statusPorudzbine.toLocaleLowerCase();
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

public loadPorudzbinaByKorisnik(id : number){
  this.porudzbinaService.getPorudzbinaByKupac(id)
    .subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    //  console.log(data)
      this.dataSource.filterPredicate = (data:any, filter: string) => {
        const accumulator = (currentTerm: any, key: any) => {
          return key === 'statusPorudzbine' ? currentTerm + data.statusPorudzbine: currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data:any, property) => {
        switch (property) {
          case 'statusPorudzbine': return data.statusPorudzbine.toLocaleLowerCase();
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

  public openDialog(flag: number, idPorudzbine ?: number, nazivAranzmana ?: string, kolicina ?: number, cenaPorudzbine ?: number, statusPorudzbine ?: string, lokacija ?: LokacijaModel, kupac?: UserModel, zaposleni ?: UserModel){
    const dialogRef = this.dialog.open(PorudzbinaDialogComponent, {data: {idPorudzbine, nazivAranzmana, kolicina, cenaPorudzbine, statusPorudzbine, lokacija, kupac, zaposleni}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(result => {
        if(result===1) {
          this.loadData();
        }
      })
  }

  public shop(kolicina : any){
    this.payment(kolicina);
  }

  selectRow(row: any){
    this.selektovanaPorudzbina = row;
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

  loadStripe() {
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51LIH8CBTYy59yxHK20vDH83NAQYk3VWEpPwZnNSpadk3PFBxi9afq52cyNwK9bqXqB0Us1VRWbnD7vuWGRoGIVZH00fYlKJs8v',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with token.id.
            // Get the token ID to your server-side code for use.
            alert('Payment Success!!');
          }
        });
      }
      window.document.body.appendChild(s);
    }
  }

  public payment(kolicina: any){

    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51LIH8CBTYy59yxHK20vDH83NAQYk3VWEpPwZnNSpadk3PFBxi9afq52cyNwK9bqXqB0Us1VRWbnD7vuWGRoGIVZH00fYlKJs8v',
      locale: 'auto',
      token: (token: any) => {
        var order = "Porudzbina od strane korisnika je uspesno dodata";
        var body = {
          tokenId : token.id,
          kolicina : kolicina * 100,
          order : order
        }

        this.http.post("http://localhost:44265/api/stripe", body, {
          headers : new HttpHeaders ({"Content-Type": "application/json"})
      }).subscribe();
    }});
    handler.open({
      name: 'Credit card',
      description: 'Please insert your data',
      currency: 'rsd',
      amount: kolicina * 100
    });


  }
}
