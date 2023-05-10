import { Component, OnInit } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
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

  query = {
    search: '',
    page: 0,
  };

  refresh$: Subject<string> = new Subject();
  companies$: Observable<Page<Company>> | null = null;

  constructor(
    private userRepository: UserRepositoryService,
    private companyRepository: CompanyRepositoryService
  ) {}

  ngOnInit(): void {
    this.user$ = this.userRepository.getCurrentUser();

    this.companies$ = this.refresh$.pipe(
      switchMap(() => {
        return this.companyRepository.getCompanies(this.query);
      })
    );
  }

  ngAfterViewInit(): void {
    this.refresh$.next('');
  }

  onSearch(): void {
    this.query.page = 0;
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
}
