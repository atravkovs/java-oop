import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { map, Observable, of, shareReplay, Subject, switchMap } from 'rxjs';
import { User } from '../../models/user.model';
import { UserRepositoryService } from '../../services/user.repository.service';

@Component({
  selector: 'app-user-list-by-emails',
  templateUrl: './user-list-by-emails.component.html',
  styleUrls: ['./user-list-by-emails.component.scss'],
})
export class UserListByEmailsComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @Input()
  emails: string[] = [];

  @Output()
  delete: EventEmitter<string> = new EventEmitter();

  email$: Subject<string[]>;
  users$: Observable<User[]> | null = null;
  missingEmails$: Observable<string[]> | null = null;

  constructor(private userRepository: UserRepositoryService) {
    this.email$ = new Subject();
  }

  ngAfterViewInit(): void {
    this.email$.next(this.emails);
  }

  ngOnInit(): void {
    this.users$ = this.email$.pipe(
      switchMap((emails) => {
        return this.userRepository.getUsersByEmails(emails);
      }),
      shareReplay(1)
    );

    this.missingEmails$ = this.users$.pipe(
      map((users) => {
        return this.emails.filter(
          (email) => !users.some((user) => user.email === email)
        );
      })
    );
  }

  /**
   * Refetch list of users, when emails are updated
   */
  ngOnChanges(_changes: SimpleChanges): void {
    this.email$.next(this.emails);
  }

  deleteUser(email: string): void {
    this.delete.emit(email);
  }
}
