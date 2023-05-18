export interface YearData {
  year: number;
  value: number;
}

export interface DatasetModel {
  title: string;
  data: YearData[];
}
