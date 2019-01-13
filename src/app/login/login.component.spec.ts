import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {LoginComponent} from './login.component';
import {LoginModule} from './login.module';
import {HttpClientModule} from '../../../node_modules/@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {tokenGetter} from '../app.module';
import {APP_CONFIG, AppConfig} from '../app.config';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                LoginModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                HttpClientModule,
                JwtModule.forRoot({config: { tokenGetter: tokenGetter}})
            ],
            providers: [
                { provide: APP_CONFIG, useValue: AppConfig },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
