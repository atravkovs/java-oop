import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import { User } from 'src/app/module/shared/user/models/user.model';
import { Page } from '../../../shared/models/page.model';
import { UserRepositoryService } from '../../../shared/user/services/user.repository.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, AfterViewInit {
  query = {
    search: '',
    page: 0,
  };

  refresh$: Subject<string> = new Subject();
  users$: Observable<Page<User>> | null = null;

  constructor(private userRepository: UserRepositoryService) {}

  ngOnInit(): void {
    this.users$ = this.refresh$.pipe(
      switchMap(() => {
        return this.userRepository.getUsers(this.query);
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
    return Array(n);
  }
}
