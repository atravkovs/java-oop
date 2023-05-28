import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompanySet } from 'src/app/module/shared/company/models/company.model';
import { CompanyRepositoryService } from 'src/app/module/shared/company/services/company.repository.service';
import { ComparisonService } from 'src/app/module/shared/comparison/comparison.service';

@Component({
  selector: 'app-company-set-row',
  templateUrl: './company-set-row.component.html',
  styleUrls: ['./company-set-row.component.scss'],
})
export class CompanySetRowComponent implements OnInit {
  @Input()
  companySet: CompanySet | null = null;

  @Output()
  deletedCompanySet: EventEmitter<number> = new EventEmitter();

  isOpen: boolean = false;

  constructor(
    private comparisonService: ComparisonService,
    private companyRepository: CompanyRepositoryService
  ) {}

  ngOnInit(): void {}

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  isSetSelected(companySet: CompanySet) {
    return this.comparisonService.isComparison(
      this.mapToRegCodeSet(companySet)
    );
  }

  selectSet(companySet: CompanySet) {
    this.comparisonService.setComparison(this.mapToRegCodeSet(companySet));
  }

  mapToRegCodeSet(companySet: CompanySet) {
    return new Set(companySet.companies.map((x) => x.regcode));
  }

  removeCompanyFromSet(regcode: number) {
    if (!this.companySet) {
      return;
    }
    this.companyRepository
      .removeCompanyFromSet(this.companySet.setId, regcode)
      .subscribe({
        next: (response) => (this.companySet = response),
        error: (err) => console.error(err),
      });
  }

  deleteCompanySet(setId: number) {
    this.companyRepository.deleteCompanySet(setId).subscribe({
      next: () => this.deletedCompanySet.emit(setId),
      error: (err) => console.error(err),
    });
  }
}
