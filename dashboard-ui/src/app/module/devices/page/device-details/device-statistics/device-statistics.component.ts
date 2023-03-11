import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { interval, map, Observable, shareReplay, switchMap, timer } from 'rxjs';
import { DataPoint } from '../../../models/data-point.model';
import { HardwareRepositoryService } from '../../../services/hardware.repository.service';
import prettyBytes from 'pretty-bytes';

@Component({
  selector: 'app-device-statistics',
  templateUrl: './device-statistics.component.html',
  styleUrls: ['./device-statistics.component.scss'],
})
export class DeviceStatisticsComponent implements OnInit {
  @Input()
  deviceCode: number = 0;

  constructor() {}

  ngOnInit(): void {
  }

}
