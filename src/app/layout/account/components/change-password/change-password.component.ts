import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../shared/services';
import {Router, ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {passwordConfirmValidator} from '../../../../shared/directives';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-account-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
    public mainForm: FormGroup;
    public passwordChangeSuccess = false;
    public errors: string[] = [];
    public user: object = {}; // @todo: refactor to use model class
    private ngUnsubscribe = new Subject();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
        this.user = this.authService.getUser();

        this.mainForm = this.fb.group({
            userName: [this.user['user_name']],
            currentPassword: ['', [Validators.required]],
            password: ['', [Validators.required]],
            passwordConfirm: ['', [Validators.required]]
        }, {validator: passwordConfirmValidator});
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    onSubmit() {
        this.errors = [];
        this.passwordChangeSuccess = false;
        this.authService.updatePassword(this.mainForm.value)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                data => {
                    if (data['success']) {
                        this.passwordChangeSuccess = true;
                    }
                },
                errors => {
                    this.errors = errors.error.errors;
                }
            );
    }
}
