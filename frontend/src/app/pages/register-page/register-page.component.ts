import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  registerForm!: FormGroup;
  isSubmitted: boolean = false;

  get fc() {
    return this.registerForm.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this._fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }

  onSubmit(): void {
    const { name, lastName, address, email, password, confirmPassword } = this.registerForm?.value;
    if(this.registerForm?.invalid) {
      this.isSubmitted = true;
    } else if(this.registerForm?.valid && confirmPassword === password) {
      const registerPayload: IUserRegister = {
        name: name,
        lastName: lastName,
        address: address,
        email: email,
        password: password
      }
      this.isSubmitted = false;
      this._userService
      .register(registerPayload)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (res: IUserRegister) => {
          if(!res) return;
          console.log(res);
          this._router.navigate(['/login']);
        },
        error: (err: Error) => console.error(err?.message),
      })
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
