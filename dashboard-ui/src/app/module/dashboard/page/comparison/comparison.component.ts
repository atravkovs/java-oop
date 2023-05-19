import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComparisonDatasets } from 'src/app/module/shared/company/models/comparison.model';
import { CompanyRepositoryService } from 'src/app/module/shared/company/services/company.repository.service';
import { ComparisonService } from 'src/app/module/shared/comparison/comparison.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss'],
})
export class ComparisonComponent implements OnInit {
  comparisons$: Observable<ComparisonDatasets> | null = null;

  constructor(
    private companyService: CompanyRepositoryService,
    private comparisonService: ComparisonService
  ) {}

  ngOnInit(): void {
    this.comparisons$ = this.companyService.compareCompanies(
      this.comparisonService.getRegcodes()
    );
  }

  getRegCodesCount(): number {
    return this.comparisonService.getRegcodes().length;
  }

  clear() {
    this.comparisonService.clear();
  }
}
