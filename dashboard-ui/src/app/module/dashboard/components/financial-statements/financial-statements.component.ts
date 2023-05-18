import { Component, Input, OnInit } from '@angular/core';
import { FinancialStatement } from 'src/app/module/shared/company/models/company.model';
import { DatasetModel } from '../year-graph/year-graph.model';

@Component({
  selector: 'app-financial-statements',
  templateUrl: './financial-statements.component.html',
  styleUrls: ['./financial-statements.component.scss'],
})
export class FinancialStatementsComponent implements OnInit {
  @Input()
  financialStatements?: FinancialStatement[];

  activeFinancialStatement: FinancialStatement | null = null;

  constructor() {}

  ngOnInit(): void {
    this.activeFinancialStatement =
      this.ordered(this.financialStatements)[0] ?? null;
  }

  openYear(year: number) {
    this.activeFinancialStatement =
      this.financialStatements?.find(
        (financialStatement) => financialStatement.statementYear === year
      ) ?? this.activeFinancialStatement;
  }

  ordered(statements?: FinancialStatement[]) {
    if (!statements) {
      return [];
    }

    return statements.sort((st1, st2) => st2.statementYear - st1.statementYear);
  }
}
