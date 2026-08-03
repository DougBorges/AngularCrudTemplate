import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService, AlertService } from '@app/services';
import { MustMatch, nameOf } from '@app/helpers';
import { Role, User } from '@app/models';

interface UserFormGroup {
  title: FormControl<string | null>;
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  role: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

@Component({
  standalone: false,
  selector: 'add-edit-component',
  templateUrl: 'add-edit.component.html',
  styleUrl: 'add-edit.component.css'
})
export class AddEditComponent implements OnInit {
  form!: FormGroup<UserFormGroup>;
  id: number = -1;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group<UserFormGroup>({
      title: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', Validators.required),
      password: new FormControl('', passwordValidators),
      confirmPassword: new FormControl('', passwordValidators)
    }, {
      validators: this.mustMatchPassword
    });

    if (!this.isAddMode) {
      this.userService.getById(this.id!.valueOf())
        .pipe(first())
        .subscribe({
          next: user => this.form.patchValue(user),
          error: error => this.alertService.error(error)
        });
    }
  }

  private mustMatchPassword(group: AbstractControl) {
    return MustMatch(group, nameOf<UserFormGroup>().password, nameOf<UserFormGroup>().confirmPassword);
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    const user = this.convertFormGroupToUser();

    this.userService.create(user)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('User added', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private updateUser() {
    const user = this.convertFormGroupToUser();

    this.userService.update(this.id!.valueOf(), user)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('User updated', { keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private convertFormGroupToUser(): User {
    const user: User = {
      id: this.id,
      title: this.form.value.title || '',
      firstName: this.form.value.firstName || '',
      lastName: this.form.value.lastName || '',
      email: this.form.value.email || '',
      role: this.form.value.role || Role.User,
      password: this.form.value.password || '',
      isDeleting: false
    }

    return user;
  }
}