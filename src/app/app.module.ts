import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {APP_CONFIG, AppConfig} from './app.config';
import {AuthGuard} from './shared/guard';
import {NgProgressModule} from '@ngx-progressbar/core';
import {NgProgressHttpModule} from '@ngx-progressbar/http';
import {NgProgressRouterModule} from '@ngx-progressbar/router';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from 'ngx-cookie-service';
import {ConfirmModalComponent} from './layout/components/confirm-modal/confirm-modal.component';

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [
        AppComponent,
        ConfirmModalComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: AppConfig.whitelistedDomains,
                skipWhenExpired: true
            }
        }),
        AppRoutingModule,
        NgProgressModule,
        NgProgressHttpModule,
        NgProgressRouterModule,
        AppRoutingModule,
        NgbModule,
    ],
    exports: [],
    providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        AuthGuard,
        NgbActiveModal,
        CookieService,
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        ConfirmModalComponent
    ]
})
export class AppModule {
}
