import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Observable, timer, map, switchMap, shareReplay } from 'rxjs';
import { DataPoint } from 'src/app/module/devices/models/data-point.model';
import { HardwareRepositoryService } from 'src/app/module/devices/services/hardware.repository.service';

@Component({
  selector: 'app-cpu-graph',
  templateUrl: './cpu-graph.component.html',
  styleUrls: ['./cpu-graph.component.scss'],
})
export class CpuGraphComponent implements OnInit {
  @Input()
  deviceCode: number = 0;

  @Input()
  measurement: string = '';

  @Input()
  field: string = '';

  @Input()
  label: string = '';

  data$: Observable<ChartConfiguration<'line'>['data']> | null = null;
  interval$: Observable<unknown> | null = null;

  chartOptions: ChartConfiguration['options'] = {
    scales: {
      y: {
        ticks: {
          callback: function (value, index, values) {
            return `${value}%`;
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (item) {
            return `${Math.floor(item.raw as number)}%`;
          },
        },
      },
    },
  };

  constructor(private hardwareRepository: HardwareRepositoryService) {}

  ngOnInit(): void {
    this.interval$ = timer(0, 15 * 1000); // Refresh every 15 seconds

    this.data$ =
      this.requestBarData(this.measurement, this.field, this.label) ?? null;
  }

  private requestBarData(measurement: string, field: string, label: string) {
    return this.requestStatisticsData(measurement, field)?.pipe(
      map((deviceData) => this.constructBarChart(deviceData, label))
    );
  }

  private requestStatisticsData(measurement: string, field: string) {
    if (!this.interval$) {
      return;
    }

    return this.interval$.pipe(
      switchMap(() => {
        const fromDate = new Date();
        fromDate.setMinutes(fromDate.getMinutes() - 15);

        return this.hardwareRepository
          .getStatistics(
            this.deviceCode,
            fromDate,
            new Date(),
            measurement,
            field
          )
          .pipe(shareReplay(1));
      })
    );
  }

  private constructBarChart(deviceData: DataPoint[], label: string) {
    const labels = deviceData.map((data) => data.time.toLocaleTimeString());
    const data = deviceData.map((point) => point.value);

    return {
      labels,
      datasets: [
        {
          data,
          label,
        },
      ],
    };
  }
}
