import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '@app/services';
import { User } from '@app/models/user';

@Component({
  standalone: false,
  selector: 'list-component',
  templateUrl: 'list.component.html',
  styleUrl: 'list.component.css'
})
export class ListComponent implements OnInit {
  users$: Observable<User[]> = new Observable();
  users: User[] = [];
  loading: boolean = true;

  constructor(
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() { this.loadAllUsers(); }

  loadAllUsers() {
    this.users$ = this.userService.getAll();

    this.users$
      .pipe(first())
      .subscribe({
        next: users => {
          this.users = users || [];
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  deleteUser(id: number) {
    const user = this.users.find(x => x.id === id);
    if (!user) return;

    this.loading = true;

    user.isDeleting = true;

    this.userService.delete(id)
      .pipe(first())
      .subscribe({
        next: () => {
          window.location.reload();
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}