import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from './../../../models/userModel';
import { LokacijaModel } from './../../../models/lokacijaModel';
import { LokacijaService } from './../../../services/lokacija.service';
import { Subscription } from 'rxjs';
import { CvetniAranzman } from 'src/app/models/cvetniAranzmanModel';
import { CvetniAranzmanServiceService } from 'src/app/services/cvetni-aranzman-service.service';
import { PorudzbinaService } from './../../../services/porudzbina.service';
import { Porudzbina } from './../../../models/porudzbinaModel';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-porudzbina-dialog',
  templateUrl: './porudzbina-dialog.component.html',
  styleUrls: ['./porudzbina-dialog.component.css']
})
export class PorudzbinaDialogComponent implements OnInit {

  public flag : number;
  cvetniAranzmani : CvetniAranzman[];
  cvetniAranzmanSubscription : Subscription;
  lokacije : LokacijaModel[];
  kupci : UserModel[];
  zaposlenis : UserModel[]
  lokacijaSubscription : Subscription;
  kupacSubscription : Subscription;
  zaposleniSubscription : Subscription;
  handler : any;

  constructor(public snackBar : MatSnackBar,
    public dialogRef : MatDialogRef<PorudzbinaDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Porudzbina,
    public porudzbinaService : PorudzbinaService,
    public cvetniAranzmanService : CvetniAranzmanServiceService,
    public lokacijaService : LokacijaService,
    public userService : UserService,
    private http : HttpClient) { }

  ngOnInit(): void {
    this.cvetniAranzmanSubscription = this.cvetniAranzmanService.getAllCvetniAranzmani()
    .subscribe(cvetniAranzmani => {
      this.cvetniAranzmani = cvetniAranzmani
    }),
    this.lokacijaSubscription = this.lokacijaService.getAllLokacije()
    .subscribe(lokacije => {
      this.lokacije = lokacije
    }),
    this.kupacSubscription = this.userService.getAllUsers()
    .subscribe(kupci => {
      this.kupci = kupci
    }),
    this.zaposleniSubscription = this.userService.getAllUsers()
    .subscribe(zaposlenis => {
      this.zaposlenis = zaposlenis
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }

  public add() : void{

    if(localStorage.getItem("uloga") == 'Zaposleni'){
    this.data.cvetniAranzmanID = this.data.cvetniAranzman.cvetniAranzmanID;
    this.data.zaposleniID = this.data.zaposleni.userID;
    this.data.kupacID = this.data.kupac.userID;
    this.data.lokacijaID = this.data.lokacija.lokacijaID;
    this.data.cenaPorudzbine = this.data.cvetniAranzman.cenaAranzmana * this.data.kolicina
    }
    else{
    this.data.cvetniAranzmanID = this.data.cvetniAranzman.cvetniAranzmanID;
    this.data.zaposleniID = 5;
    this.data.kupacID = this.data.kupac.userID;
    this.data.lokacijaID = this.data.lokacija.lokacijaID;
    this.data.cenaPorudzbine = this.data.cvetniAranzman.cenaAranzmana * this.data.kolicina
    }

    this.porudzbinaService.addPorudzbina(this.data)
    .subscribe(() => {this.snackBar.open('Uspesno dodata porudzbina: ' + this.data.porudzbinaID, 'U redu', {
      duration: 2500
      });
      }),
      (error: Error) => {
        console.log(error.name + '-->' + error.message);
        this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {
        duration: 2500
        });
        };
  }



  public update() : void{
    this.porudzbinaService.updatePorudzbina(this.data)
    .subscribe(() => {this.snackBar.open('Uspesno modifikovana porudzbina: ' + this.data.porudzbinaID, ' U redu', {
      duration : 2500});
    }),
    (error: Error) => {
      console.log(error.name + '-->' + error.message);
      this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {
      duration: 2500
      });
  };
  }

  public delete() : void{
    this.porudzbinaService.deletePorudzbina(this.data.porudzbinaID)
    .subscribe(() => {
      this.snackBar.open('Uspesno obrisana porudzbina:', 'U redu', {
      duration: 2500
      });
      }),
      (error: Error) => {
        console.log(error.name + '-->' + error.message);
        this.snackBar.open('Dogodila se greska. Pokusajte ponovo!', 'Zatvori', {
        duration: 2500
        });
        };
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmena!', 'U redu', {
    duration: 1000
    });
    }

    compareTo(a: { id: any; }, b: { id: any; }) {
      return a.id == b.id;
    }

}
