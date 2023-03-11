import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/module/shared/user/models/user.model';
import { UserRepositoryService } from 'src/app/module/shared/user/services/user.repository.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  user$: Observable<User> | null = null;

  constructor(private userRepository: UserRepositoryService) {}

  ngOnInit(): void {
    this.user$ = this.userRepository.getCurrentUser();
  }
}
