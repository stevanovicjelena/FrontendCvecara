import { Component, Input, OnInit } from '@angular/core';
import { Cvet } from 'src/app/models/cvetModel';

@Component({
  selector: 'app-vrsta-cveta',
  templateUrl: './vrsta-cveta.component.html',
  styleUrls: ['./vrsta-cveta.component.css']
})
export class VrstaCvetaComponent implements OnInit {

  @Input() selektovanCvet !: Cvet;

  constructor() { }

  ngOnInit(): void {
  }

}
