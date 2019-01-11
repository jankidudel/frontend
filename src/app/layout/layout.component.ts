import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
    private tokenExpiredObservable: Subscription;

    constructor(
        public router: Router,
        private authService: AuthService) {
    }

    ngOnInit() {
        this.tokenExpiredObservable = interval(3000).subscribe(x => {
            if (this.authService.isTokenExpired()) {
                this.authService.logout();
                this.router.navigate(['/login']);
            }
        });
    }

    ngOnDestroy() {
        this.tokenExpiredObservable.unsubscribe();
    }
}
