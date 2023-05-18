import { Component, Input, OnInit } from '@angular/core';
import { Company } from 'src/app/module/shared/company/models/company.model';
import { ComparisonService } from 'src/app/module/shared/comparison/comparison.service';

@Component({
  selector: 'app-company-row',
  templateUrl: './company-row.component.html',
  styleUrls: ['./company-row.component.scss'],
})
export class CompanyRowComponent implements OnInit {
  @Input()
  company: Company | null = null;

  selectedForComparison: boolean = false;

  constructor(private comparisonService: ComparisonService) {}

  ngOnInit(): void {
    this.updateSelectedForComparison();
  }

  toggleSelectForComparison() {
    if (!this.company) {
      return;
    }

    if (this.selectedForComparison) {
      this.comparisonService.removeFromComparison(this.company.regcode);
    } else {
      this.comparisonService.addForComparison(this.company.regcode);
    }

    this.updateSelectedForComparison();
  }

  private updateSelectedForComparison() {
    if (!this.company) {
      return;
    }

    this.selectedForComparison = this.comparisonService.hasInComparison(
      this.company?.regcode
    );
  }
}
