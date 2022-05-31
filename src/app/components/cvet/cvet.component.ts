import { Cvet } from 'src/app/models/cvetModel';
import { VrstaCveta } from './../../models/vrstaCvetaModel';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CvetServiceService } from 'src/app/services/cvet.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CvetDialogComponent } from '../dialogs/cvet-dialog/cvet-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cvet',
  templateUrl: './cvet.component.html',
  styleUrls: ['./cvet.component.css']
})
export class CvetComponent implements OnInit, OnDestroy {

  displayedColumns = ['idCveta', 'bojaCveta', 'cenaCveta', 'vrstaCveta', 'actions'];
  dataSource !: MatTableDataSource<Cvet> ;
  subscription !: Subscription;
  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  dialog !: MatDialog
  selektovanCvet !: Cvet;

  constructor(private cvetService : CvetServiceService) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy() : void{
    this.subscription.unsubscribe();
  }

  public loadData(){
    this.cvetService.getAllCvetovi()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        console.log(data)
        this.dataSource.filterPredicate = (data:any, filter: string) => {
          const accumulator = (currentTerm: any, key: any) => {
            return key === 'vrsta' ? currentTerm + data.vrstaCveta.nazivVrste: currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        this.dataSource.sortingDataAccessor = (data:any, property) => {
          switch (property) {
            case 'vrsta': return data.vrstaCveta.nazivVrste.toLocaleLowerCase();
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

  public openDialog(flag: number, idCveta ?: number, bojaCveta ?: string, cenaCveta ?: number,vrstaCveta ?: VrstaCveta ){
    const dialogRef = this.dialog.open(CvetDialogComponent, {data : {idCveta, bojaCveta, cenaCveta, vrstaCveta}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
    .subscribe(result => {
      if (result==1){
        this.loadData;
      }
    })
  }

  selectRow(row: any) {

    this.selektovanCvet = row;

  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
