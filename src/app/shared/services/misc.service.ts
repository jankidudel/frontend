import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {APP_CONFIG, IAppConfig} from '../../app.config';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class MiscService {

    constructor(
        private httpClient: HttpClient,
        @Inject(APP_CONFIG) private config: IAppConfig,
        private authService: AuthService) {

    }

    getCountryList(): Observable<string[]> {
        const url = this.config.apiEndpoint + 'misc/country-list';

        return this.httpClient.get(url)
            .pipe(map(res => {
                return res as string[];
            }));
    }
}
