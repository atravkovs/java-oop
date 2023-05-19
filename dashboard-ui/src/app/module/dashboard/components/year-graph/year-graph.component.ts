import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { DatasetModel } from './year-graph.model';

@Component({
  selector: 'app-year-graph',
  templateUrl: './year-graph.component.html',
  styleUrls: ['./year-graph.component.scss'],
})
export class YearGraphComponent implements OnInit {
  chartOptions: ChartConfiguration['options'] = {};

  @Input()
  dataset: DatasetModel[] = [];

  data: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };

  constructor() {}

  ngOnInit(): void {
    const labelSet = new Set(
      this.dataset.flatMap((set) => set.data.map((data) => data.year))
    );

    this.data.labels = [...labelSet].sort().map((label) => `${label}`);

    this.data.datasets = this.dataset.map((set) => ({
      data: this.data.labels!.map(
        (yearLabel) =>
          set.data.find((entry) => `${entry.year}` === yearLabel)?.value ?? null
      ),
      label: set.title,
      fill: false,
      tension: 0.1,
      pointRadius: 3,
      pointBorderWidth: 1,
      showLine: true,
    }));
  }
}
