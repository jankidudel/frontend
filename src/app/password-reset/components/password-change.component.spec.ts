import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PasswordChangeComponent} from './password-change.component';
import {PasswordResetModule} from '../password-reset.module';
import {HttpClientModule} from '../../../../node_modules/@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {tokenGetter} from '../../app.module';
import {APP_CONFIG, AppConfig} from '../../app.config';
import {AuthService} from '../../shared/services';
import {AuthServiceStub} from '../../shared/test/stubs';

describe('PasswordChangeComponent', () => {
    let component: PasswordChangeComponent;
    let fixture: ComponentFixture<PasswordChangeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                PasswordResetModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                HttpClientModule,
                JwtModule.forRoot({config: { tokenGetter: tokenGetter}})
            ],
            providers: [
                { provide: APP_CONFIG, useValue: AppConfig },
                { provide: AuthService, useClass: AuthServiceStub}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordChangeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
