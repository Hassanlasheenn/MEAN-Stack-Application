import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  private _destroy$ = new Subject<void>();
  resetPasswordForm!: FormGroup;
  isSubmitted: boolean = false;

  get fc() {
    return this.resetPasswordForm.controls;
  }

  constructor(
    private _fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.resetPasswordForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onResetLink(): void {}
}
