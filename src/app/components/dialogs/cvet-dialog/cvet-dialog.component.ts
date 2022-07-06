import { VrstaCveta } from './../../../models/vrstaCvetaModel';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cvet } from 'src/app/models/cvetModel';
import { CvetServiceService } from 'src/app/services/cvet.service';
import { Subscription } from 'rxjs';
import { VrstaCvetaServiceService } from 'src/app/services/vrsta-cveta-service.service';

@Component({
  selector: 'app-cvet-dialog',
  templateUrl: './cvet-dialog.component.html',
  styleUrls: ['./cvet-dialog.component.css']
})
export class CvetDialogComponent implements OnInit {

  public flag : number;
  vrsteCvetova : VrstaCveta[];
  vrstaSubscription : Subscription;

  constructor(public snackBar : MatSnackBar,
              public dialogRef : MatDialogRef<CvetDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Cvet,
              public cvetService : CvetServiceService,
              public vrstaCvetaService : VrstaCvetaServiceService) { }

  ngOnInit(): void {
    this.vrstaSubscription = this.vrstaCvetaService.getAllVrste()
    .subscribe(vrsteCvetova => {
      this.vrsteCvetova = vrsteCvetova
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }

  ngOnDestroy(): void {
    this.vrstaSubscription.unsubscribe();
  }

  compareTo(a: { id: any; }, b: { id: any; }) {
    return a.id == b.id;
  }

  public add() : void{
    this.data.vrstaCvetaID = this.data.vrstaCveta.vrstaCvetaID;
    this.cvetService.addCvet(this.data)
    .subscribe(() => {this.snackBar.open('Uspesno dodat cvet: ' + this.data.vrstaCveta?.nazivVrste, 'U redu', {
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
    this.data.vrstaCvetaID = this.data.vrstaCveta.vrstaCvetaID;
    this.cvetService.updateCvet(this.data)
    .subscribe(() => {this.snackBar.open('Uspesno modifikovan cvet: ' + this.data.bojaCveta, ' U redu', {
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
    this.data.vrstaCvetaID = this.data.vrstaCveta.vrstaCvetaID;
    this.cvetService.deleteCvet(this.data.cvetID)
    .subscribe(() => {
      this.snackBar.open('Uspesno obrisan cvet:', 'U redu', {
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

}

