import { Pakovanje } from './../../../models/pakovanjeModel';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CvetniAranzman } from 'src/app/models/cvetniAranzmanModel';
import { CvetniAranzmanServiceService } from 'src/app/services/cvetni-aranzman-service.service';
import { Subscription } from 'rxjs';
import { PakovanjeService } from 'src/app/services/pakovanje.service';

@Component({
  selector: 'app-cvetni-aranzman-dialog',
  templateUrl: './cvetni-aranzman-dialog.component.html',
  styleUrls: ['./cvetni-aranzman-dialog.component.css']
})
export class CvetniAranzmanDialogComponent implements OnInit {

  public flag !: number;
  pakovanja : Pakovanje[];
  pakovanjeSubscription : Subscription;

  constructor(public snackBar : MatSnackBar,
    public dialogRef : MatDialogRef<CvetniAranzmanDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: CvetniAranzman,
    public cvetniAranzmanService : CvetniAranzmanServiceService,
    public pakovanjeService : PakovanjeService) { }

  ngOnInit(): void {
    this.pakovanjeSubscription = this.pakovanjeService.getAllPakovanja()
    .subscribe(pakovanja => {
      this.pakovanja = pakovanja
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }

  public add() : void{
    this.data.pakovanjeID = this.data.pakovanje.pakovanjeID;
    this.cvetniAranzmanService.addCvetniAranzman(this.data)
    .subscribe(() => {this.snackBar.open('Uspesno dodat cvetniAranzman: ' + this.data.nazivAranzmana, 'U redu', {
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
    this.cvetniAranzmanService.updateCvetniAranzman(this.data)
    .subscribe(() => {this.snackBar.open('Uspesno modifikovan cvetni aranzman: ' + this.data.nazivAranzmana, ' U redu', {
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
    this.cvetniAranzmanService.deleteCvetniAranzman(this.data.cvetniAranzmanID)
    .subscribe(() => {
      this.snackBar.open('Uspesno obrisan cvetni aranzman:', 'U redu', {
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
