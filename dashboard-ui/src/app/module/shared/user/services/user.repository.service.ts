import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../models/page.model';
import { UserUpdateModel } from '../models/user-update.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryService {
  constructor(private http: HttpClient) {}

  updateUser(email: string, user: UserUpdateModel): Observable<User> {
    return this.http.put<User>(`/api/users/user/${email}`, user);
  }

  deleteUser(email: string): Observable<unknown> {
    return this.http.delete(`/api/users/user/${email}`);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>('/api/users/user');
  }

  getUsers(query: { search?: string; page?: number }): Observable<Page<User>> {
    return this.http.get<Page<User>>('/api/users/users', {
      params: query,
    });
  }

  getUsersByEmails(emails: string[]): Observable<User[]> {
    return this.http.get<User[]>(`/api/users/users/emails`, {
      params: { emails },
    });
  }
}
