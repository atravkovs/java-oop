import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import {
  Company,
  MinimalCompanySet,
} from 'src/app/module/shared/company/models/company.model';
import { CompanyRepositoryService } from 'src/app/module/shared/company/services/company.repository.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
})
export class CompanyDetailsComponent implements OnInit {
  company$: Observable<Company> | null = null;
  sets$: Observable<MinimalCompanySet[]> | null = null;

  companyRegCode: number | null = null;
  companySetForm: FormGroup = new FormGroup({
    setId: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private companyRepository: CompanyRepositoryService
  ) {}

  get setId() {
    return this.companySetForm.get('setId');
  }

  ngOnInit(): void {
    this.company$ = this.route.params.pipe(
      switchMap((params) => {
        return this.companyRepository.getCompanyDetails(+params['id']);
      })
    );
    this.sets$ = this.companyRepository.getAllCompanySets();
    this.company$.subscribe({
      next: (company) => (this.companyRegCode = company.regcode),
    });
  }

  setSuccessMessage(message: string) {
    this.errorMessage = null;
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = null;
    }, 2500);
  }

  addCompanyToSet(): void {
    if (!this.companySetForm.valid || !this.setId?.value || !this.companyRegCode) {
      return;
    }

    this.companyRepository
      .addCompanyToSet(this.setId.value, this.companyRegCode)
      .subscribe({
        next: () => {
          this.companySetForm.reset();
          this.setSuccessMessage('Successfully added company to set!');
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to add company to set!';
        },
      });
  }
}
