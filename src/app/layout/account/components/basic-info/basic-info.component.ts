import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {AuthService, MiscService} from '../../../../shared/services';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-account-basic-info',
    templateUrl: './basic-info.component.html',
    styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent implements OnInit, OnDestroy {
    public mainForm: FormGroup;
    public errors: string[] = [];
    public countryList: string[] = [];
    public user: object = {}; // @todo: refactor to use model class
    private ngUnsubscribe = new Subject();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private authService: AuthService,
        private miscService: MiscService
    ) {
    }

    ngOnInit() {
        this.user = this.authService.getUser();

        this.mainForm = this.fb.group({
            email: [this.user['email']],
            userName: [this.user['user_name']],
            niceName: [this.user['nice_name']],
            phone: [''],
            password: [''],
            country: [''],
        });

        this.miscService.getCountryList()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(data => {
                this.countryList = data;
            });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    onSubmit() {
        this.authService.updateAccountData(this.mainForm.value)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                data => {
                    this.user = this.authService.getUser();
                }
            );
    }
}
