import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthService} from '../shared/services';
import {Router} from '@angular/router';

@Component({
    selector: 'app-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
    resetForm: FormGroup;
    resetRequestSuccess = false;
    errors: string[] = [];

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService) {
    }

    ngOnInit() {
        this.resetForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        this.errors = [];
        this.authService.passwordReset(this.resetForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    if (data['success']) {
                        this.resetRequestSuccess = true;
                    }
                },
                errors => {
                    this.errors = errors.error.errors;
                }
            );
    }

    get email() {
        return this.resetForm.get('email');
    }
}
