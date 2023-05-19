import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  Company,
  FinancialStatement,
} from 'src/app/module/shared/company/models/company.model';
import { CompanyRepositoryService } from 'src/app/module/shared/company/services/company.repository.service';

@Component({
  selector: 'app-top-companies',
  templateUrl: './top-companies.component.html',
  styleUrls: ['./top-companies.component.scss'],
})
export class TopCompaniesComponent implements OnInit, OnChanges {
  companies$: Observable<Company[]> | null = null;

  isLoading: boolean = true;

  @Input()
  category: string = 'employee';

  @Input()
  year: number = 2021;

  constructor(private companyRepository: CompanyRepositoryService) {}

  ngOnChanges(): void {
    this.requestData();
  }

  ngOnInit(): void {
    this.requestData();
  }

  requestData(): void {
    this.isLoading = true;

    this.companies$ = this.companyRepository
      .getCompanyTop(this.category, this.year)
      .pipe(
        tap(() => {
          this.isLoading = false;
        })
      );
  }

  findYear(company: Company): FinancialStatement {
    return company.financialStatements
      .sort((s1, s2) => s2.employeeCount - s1.employeeCount)
      .find((statement) => statement.statementYear === this.year)!;
  }
}
