import { DatasetModel } from 'src/app/module/dashboard/components/year-graph/year-graph.model';

export enum DatasetType {
  EMPLOYEE_COUNT = 'employeeCount',
  INCOME_BEFORE_TAXES = 'incomeBeforeTaxes',
}

export type ComparisonDatasets = Record<DatasetType, DatasetModel[]>;
