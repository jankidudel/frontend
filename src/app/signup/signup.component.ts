import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthService} from '../shared/services';
import {Router} from '@angular/router';
import {passwordConfirmValidator} from '../shared/directives';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    signupSuccess = false;
    errors: string[] = [];

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService) {
    }

    ngOnInit() {
        this.signupForm = this.fb.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            passwordConfirm: ['', [Validators.required]]
        }, {validator: passwordConfirmValidator});
    }

    onSubmit() {
        this.errors = [];
        this.authService.signup(this.signupForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    if (data['success'] === true) {
                        this.signupSuccess = true;
                    }
                },
                errors => {
                    this.errors = errors.error.errors;
                }
            );
    }

    get email() {
        return this.signupForm.get('email');
    }
}
