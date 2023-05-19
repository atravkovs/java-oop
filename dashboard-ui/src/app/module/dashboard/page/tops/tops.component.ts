import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tops',
  templateUrl: './tops.component.html',
  styleUrls: ['./tops.component.scss']
})
export class TopsComponent implements OnInit {

  category: string = 'employee';
  activeYear: number = 2021;

  constructor() { }

  ngOnInit(): void {
  }

  openYear(year: number) {
    this.activeYear = year;
  }

}
