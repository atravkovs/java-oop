import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Company } from 'src/app/module/shared/company/models/company.model';
import { CompanyRepositoryService } from 'src/app/module/shared/company/services/company.repository.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
})
export class CompanyDetailsComponent implements OnInit {
  company$: Observable<Company> | null = null;

  constructor(
    private route: ActivatedRoute,
    private companyRepository: CompanyRepositoryService
  ) {}

  ngOnInit(): void {
    this.company$ = this.route.params.pipe(
      switchMap((params) => {
        return this.companyRepository.getCompanyDetails(+params['id']);
      })
    );
  }
}
