import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {APP_CONFIG, IAppConfig} from '../../app.config';
import {map} from 'rxjs/operators';
import {UserModel} from '../models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private httpClient: HttpClient,
        public jwtHelper: JwtHelperService,
        @Inject(APP_CONFIG) private config: IAppConfig) {
    }

    login(data) {
        const url = this.config.apiEndpoint + 'auth/login';

        return this.httpClient.post(url, JSON.stringify(data))
            .pipe(map(res => {
                    // Attach service here, for terms and conditions info retrieval.
                    if (res && res['token']) {
                        this.setToken(res['token']);
                        const user = res['user'];
                        this.setUser(user);
                    }
                })
            );

    }

    logout() {
        localStorage.removeItem('token');
    }

    signup(data) {
        const url = this.config.apiEndpoint + 'auth/signup';

        return this.httpClient.post(url, JSON.stringify(data))
            .pipe(map(res => {
                return res;
            }));
    }

    emailConfirm(data) {
        const url = this.config.apiEndpoint + 'auth/email-confirm';

        return this.httpClient.post(url, JSON.stringify(data))
            .pipe(map(res => {
                return res;
            }));
    }

    passwordReset(data) {
        const url = this.config.apiEndpoint + 'auth/password-reset';

        return this.httpClient.post(url, JSON.stringify(data))
            .pipe(map(res => {
                return res;
            }));

    }

    passwordChange(data) {
        const url = this.config.apiEndpoint + 'auth/password-change';

        return this.httpClient.post(url, JSON.stringify(data))
            .pipe(map(res => {
                return res;
            }));
    }

    updateAccountData(data) {
        const url = this.config.apiEndpoint + 'account/update-account';
        return this.httpClient.post(url, JSON.stringify(data))
            .pipe(map(res => {
                const user = res['user'];
                this.setUser(user);
            }));
    }

    updatePassword(data) {
        const url = this.config.apiEndpoint + 'account/update-password';
        return this.httpClient.post(url, JSON.stringify(data))
            .pipe(map(res => {
                return res;
            }));
    }

    isLoggedIn() {
        return ((this.getToken() != null) && !(this.jwtHelper.isTokenExpired(this.getToken())));
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    isTokenExpired() {
        return this.jwtHelper.isTokenExpired(this.getToken());
    }

    setUser(user: object) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): UserModel {
        return JSON.parse(localStorage.getItem('user'));
    }
}
