import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-country-map',
  templateUrl: './country-map.component.html',
  styleUrls: ['./country-map.component.scss']
})
export class CountryMapComponent implements OnInit {
  
  @Output()
  refresh: EventEmitter<string> = new EventEmitter();

  constructor() { }

  refresh$: Subject<string> = new Subject();

  ngOnInit(): void {
  } 

  refreshPage(value: string) {
    this.refresh.emit(value);
  }
}
