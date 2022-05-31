import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CvetniAranzman } from 'src/app/models/cvetniAranzmanModel';
import { CvetniAranzmanServiceService } from 'src/app/services/cvetni-aranzman-service.service';
import { CvetniAranzmanDialogComponent } from '../dialogs/cvetni-aranzman-dialog/cvetni-aranzman-dialog.component';

@Component({
  selector: 'app-cvetni-aranzman',
  templateUrl: './cvetni-aranzman.component.html',
  styleUrls: ['./cvetni-aranzman.component.css']
})
export class CvetniAranzmanComponent implements OnInit, OnDestroy {

  displayedColumns = ['idCvetnogAranzmana', 'nazivAranzmana', 'cenaAranzmana', 'opisAranzmana', 'actions'];
  dataSource !: MatTableDataSource<CvetniAranzman> ;
  subscription !: Subscription;
  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  dialog !: MatDialog
  selektovanCvetniAranzman !: CvetniAranzman;

  constructor(private cvetniAranzmanService : CvetniAranzmanServiceService) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy() : void{
    this.subscription.unsubscribe();
  }

  public loadData(){
    this.cvetniAranzmanService.getAllCvetniAranzmani()
    .subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data)
      this.dataSource.filterPredicate = (data:any, filter: string) => {
        const accumulator = (currentTerm: any, key: any) => {
          return key === 'naziv' ? currentTerm + data.nazivAranzmana: currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data:any, property) => {
        switch (property) {
          case 'naziv': return data.nazivAranzmana.toLocaleLowerCase();
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

public openDialog(flag: number, idCvetnogAranzmana ?: number, nazivAranzmana ?: string, cenaAranzmana ?: number, opisAranzmana ?: string ){
    const dialogRef = this.dialog.open(CvetniAranzmanDialogComponent, {data : {idCvetnogAranzmana, nazivAranzmana, cenaAranzmana, opisAranzmana}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
    .subscribe(result => {
      if (result==1){
        this.loadData;
      }
    })
  }

  selectRow(row: any) {

    this.selektovanCvetniAranzman = row;

  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
