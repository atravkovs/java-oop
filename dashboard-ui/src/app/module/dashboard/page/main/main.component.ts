import { Component, OnInit } from '@angular/core';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { CompanyType } from 'src/app/module/shared/company/models/company-type.model';
import { Company } from 'src/app/module/shared/company/models/company.model';
import { CompanyRepositoryService } from 'src/app/module/shared/company/services/company.repository.service';
import { Page } from 'src/app/module/shared/models/page.model';
import { User } from 'src/app/module/shared/user/models/user.model';
import { UserRepositoryService } from 'src/app/module/shared/user/services/user.repository.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  user$: Observable<User> | null = null;
  companyTypes$: Observable<CompanyType[]> | null = null;

  isLoading: boolean = true;
  showMap: boolean = false;

  query = {
    page: 0,
    search: '',
    activeCompanies: false,
    hasStats: false,
    companyType: 'ALL',
    employeeFrom: 0,
    employeeTo: 0,
    incomeFrom: 0,
    incomeTo: 0,
    postIndexes: new Array(),
  };

  refresh$: Subject<string> = new Subject();
  companies$: Observable<Page<Company>> | null = null;

  constructor(
    private userRepository: UserRepositoryService,
    private companyRepository: CompanyRepositoryService
  ) {}

  ngOnInit(): void {
    this.user$ = this.userRepository.getCurrentUser();
    this.companyTypes$ = this.companyRepository.getCompanyTypes();

    this.companies$ = this.refresh$.pipe(
      switchMap(() => {
        return this.companyRepository.getCompanies(this.query);
      }),
      tap(() => {
        this.isLoading = false;
      })
    );
  }

  ngAfterViewInit(): void {
    this.refresh$.next('');
  }

  onSearch(): void {
    this.query.postIndexes = this.getPostIndexes();
    this.query.page = 0;
    this.isLoading = true;
    this.refresh$.next('');
  }

  updatePage(page: number): void {
    if (this.query.page !== page) {
      this.query.page = page;
      this.refresh$.next('');
    }
  }

  deleteUser(user: User) {
    this.userRepository.deleteUser(user.email).subscribe(() => {
      this.refresh$.next('');
    });
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

  /**
   * Gets selected values of post index checkboxes if map is shown
   */
  getPostIndexes(): Array<String> {
    if (!this.showMap) {return new Array();}
    let selected = new Array();
    let elements = document.querySelectorAll('.post-index-select:checked');
    for (let i = 0; i < elements.length; i++) {
      selected.push((elements[i] as HTMLSelectElement).value);
    }
    return selected;
  }
}
