import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthService} from '../../../shared/services';

@Component({
    selector: 'app-signup-email-confirm',
    templateUrl: './email-confirm.component.html',
    styleUrls: ['./email-confirm.component.scss'],
})
export class EmailConfirmComponent implements OnInit {
    activationKey: string;
    emailConfirmSuccess = false;
    emailConfirmError = '';

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private authService: AuthService) {
    }

    ngOnInit() {
        this.activationKey = this.route.snapshot.queryParamMap.get('k');

        this.authService.emailConfirm({confirmKey: this.activationKey})
            .pipe(first())
            .subscribe(
                data => {
                    if (data['success'] === true) {
                        this.emailConfirmSuccess = true;
                    } else {
                        this.emailConfirmError = data['error'];
                    }
                }
            );
    }
}
