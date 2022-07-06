import { CvetniAranzmanServiceService } from 'src/app/services/cvetni-aranzman-service.service';
import { CvetniAranzman } from 'src/app/models/cvetniAranzmanModel';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PorudzbinaComponent } from '../porudzbina/porudzbina.component';
import { Porudzbina } from 'src/app/models/porudzbinaModel';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { PorudzbinaDialogComponent } from '../dialogs/porudzbina-dialog/porudzbina-dialog.component';

@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.component.html',
  styleUrls: ['./korpa.component.css']
})
export class KorpaComponent implements OnInit {
  aranzmani : CvetniAranzman[];
  displayedColumns = ['cvetniAranzmanID', 'nazivAranzmana', 'cenaAranzmana', 'opisAranzmana','pakovanje', 'actions'];
  dataSource : MatTableDataSource<CvetniAranzman>;

  porudzbinaComponent : PorudzbinaComponent;
  porudzbina : Porudzbina;

  constructor(public dialog: MatDialog,
              public http: HttpClient) { }

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem("aranzmani")!))
    this.aranzmani = JSON.parse(localStorage.getItem("aranzmani")!)
    console.log('aranzmani')
    console.log(this.aranzmani)
    this.dataSource = new MatTableDataSource(this.aranzmani)
    // this.dataSource= new MatTableDataSource(JSON.parse(localStorage.getItem("aranzmani")!));
  }

  public createPorudzbina(){
    this.porudzbina = new Porudzbina();

    this.porudzbina.kupacID = JSON.parse(localStorage.getItem("id")!)
    this.porudzbina.cvetniAranzman = JSON.parse(localStorage.getItem("aranzmani")!);

   // const dialogRef = this.dialog.open(PorudzbinaDialogComponent, {data: {idPorudzbine : this.porudzbina.porudzbinaID, nazivAranzmana :, kolicina, cenaPorudzbine, statusPorudzbine, lokacija, kupac, zaposleni}});
  }

  public remove(cvetniAranzman : CvetniAranzman) {

  }
}
