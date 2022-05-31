import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CvetniAranzman } from 'src/app/models/cvetniAranzmanModel';
import { CvetniAranzmanServiceService } from 'src/app/services/cvetni-aranzman-service.service';

@Component({
  selector: 'app-cvetni-aranzman-dialog',
  templateUrl: './cvetni-aranzman-dialog.component.html',
  styleUrls: ['./cvetni-aranzman-dialog.component.css']
})
export class CvetniAranzmanDialogComponent implements OnInit {

  public flag !: number;

  constructor(public snackBar : MatSnackBar,
    public dialogRef : MatDialogRef<CvetniAranzmanDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: CvetniAranzman,
    public cvetniAranzmanService : CvetniAranzmanServiceService) { }

  ngOnInit(): void {

  }

  public add() : void{
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
    this.cvetniAranzmanService.deleteCvetniAranzman(this.data.idCvetnogAranzmana)
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

}
