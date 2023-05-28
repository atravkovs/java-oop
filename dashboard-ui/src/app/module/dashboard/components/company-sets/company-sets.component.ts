import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { CompanySet } from 'src/app/module/shared/company/models/company.model';
import { CompanyRepositoryService } from 'src/app/module/shared/company/services/company.repository.service';
import { Page } from 'src/app/module/shared/models/page.model';

@Component({
  selector: 'app-company-sets',
  templateUrl: './company-sets.component.html',
  styleUrls: ['./company-sets.component.scss'],
})
export class CompanySetsComponent implements OnInit {
  companySets$: Observable<Page<CompanySet>> | null = null;

  isLoading: boolean = true;

  query = {
    page: 0,
  };

  refresh$: Subject<string> = new Subject();

  successMessage: string | null = null;
  errorMessage: string | null = null;

  companySetCreateForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
    ]),
  });

  get name() {
    return this.companySetCreateForm.get('name');
  }

  constructor(private companyService: CompanyRepositoryService) {}

  ngOnInit(): void {
    this.companySets$ = this.refresh$.pipe(
      switchMap(() => {
        return this.companyService.getCompanySetPage(this.query);
      }),
      tap(() => {
        this.isLoading = false;
      })
    );
  }

  ngAfterViewInit(): void {
    this.refresh$.next('');
  }

  updatePage(page: number): void {
    if (this.query.page !== page) {
      this.query.page = page;
      this.refresh$.next('');
    }
  }

  refreshPage() {
    this.refresh$.next('');
  }

  /**
   * Generates an array of given length
   */
  numSequence(n: number): Array<number> {
    if (n > 10) {
      return Array(10);
    }

    return Array(n);
  }

  addCompanyToSet(): void {
    if (!this.companySetCreateForm.valid || !this.name?.value) {
      return;
    }

    this.companyService.createCompanySet(this.name.value, []).subscribe({
      next: () => {
        this.companySetCreateForm.reset();
        this.errorMessage = null;
        this.successMessage = 'Successfully created set!';
        setTimeout(() => {
          this.successMessage = null;
        }, 2500);
        this.refresh$.next('');
      },
      error: (err) => {
        this.errorMessage = 'Failed to create set!';
        console.error(err);
      },
    });
  }
}
