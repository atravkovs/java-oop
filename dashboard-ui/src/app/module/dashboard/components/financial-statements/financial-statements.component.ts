import { Component, Input, OnInit } from '@angular/core';
import { FinancialStatement } from 'src/app/module/shared/company/models/company.model';

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
    this.activeFinancialStatement = this.financialStatements?.[0] ?? null;
  }

  openYear(year: number) {
    this.activeFinancialStatement =
      this.financialStatements?.find(
        (financialStatement) => financialStatement.statementYear === year
      ) ?? this.activeFinancialStatement;
  }
}
