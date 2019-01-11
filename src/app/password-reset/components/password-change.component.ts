import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthService} from '../../shared/services';
import {Router, ActivatedRoute} from '@angular/router';
import {passwordConfirmValidator} from '../../shared/directives';

@Component({
    selector: 'app-password-change',
    templateUrl: './password-change.component.html',
    styleUrls: ['./password-change.component.scss'],
})
export class PasswordChangeComponent implements OnInit {
    mainForm: FormGroup;
    resetKey: string;
    passwordChangeSuccess = false;
    errors: string[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private authService: AuthService) {
    }

    ngOnInit() {
        this.resetKey = this.route.snapshot.queryParamMap.get('k');
        if (!this.resetKey) {
            this.router.navigate(['/login']);
        }

        this.mainForm = this.fb.group({
            resetKey: [this.resetKey],
            password: ['', [Validators.required]],
            passwordConfirm: ['', [Validators.required]]
        }, {validator: passwordConfirmValidator});
    }

    onSubmit() {
        this.errors = [];
        this.authService.passwordChange(this.mainForm.value)
            .pipe(first())
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
