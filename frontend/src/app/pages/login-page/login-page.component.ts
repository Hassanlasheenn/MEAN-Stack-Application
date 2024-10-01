import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { IUserLogin } from 'src/app/shared/interfaces/IUserLogin';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  returnUrl: string = '';

  get fc() {
    return this.loginForm.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private toastr: ToastrService // Inject ToastrService for notifications
  ) {}

  ngOnInit(): void {
    this.initForm();

    if (this._userService.isLoggedIn()) {
      this._router.navigateByUrl('/home');
    } else {
      // Set returnUrl only if the user is not logged in
      this.returnUrl = this._activatedRoute.snapshot.queryParams.returnUrl || '/login';
    }
  }

  initForm(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', Validators.required]
    });
  }

  async login(): Promise<void> {
    const loginRequest: IUserLogin = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this._userService
      .login(loginRequest)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (res: User) => {
          if (res) {
            this._userService.setUser = res;
            this._userService.setUserLocalStorage(res);
            this._router.navigateByUrl(this.returnUrl);
          } else {
            this.toastr.error('Login failed. Please check your credentials.'); // Provide feedback on login failure
          }
        },
        error: (err: Error) => {
          console.error(err);
          this.toastr.error('Login failed. Please try again.'); // Provide feedback on login failure
        },
      });
  }

  onSubmit(): void {
    if (this.loginForm?.invalid) {
      this.isSubmitted = true;
    } else {
      this.isSubmitted = false;
      this.login();
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}