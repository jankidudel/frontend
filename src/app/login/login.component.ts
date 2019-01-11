import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import { routerTransition } from '../router.animations';
import {first} from 'rxjs/operators';
import {AuthService} from '../shared/services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
//    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errors: string[] = [];

    constructor(
        public router: Router,
        private fb: FormBuilder,
        private authService: AuthService) {
    }

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['']);
        }

        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required],
            rememberMe: [false]
        });
    }

    onSubmit() {
        this.errors = [];
        this.authService.login(this.loginForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['']);
                },
                errors => {
                    this.errors = errors.error.errors;
                }
            );
    }
}
