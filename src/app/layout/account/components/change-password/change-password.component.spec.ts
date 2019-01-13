import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChangePasswordComponent} from './change-password.component';
import {AccountModule} from '../../account.module';
import {HttpClientModule} from '../../../../../../node_modules/@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {APP_CONFIG, AppConfig} from '../../../../app.config';
import {tokenGetter} from '../../../../app.module';
import {AuthService} from '../../../../shared/services';
import {AuthServiceStub} from '../../../../shared/test/stubs';

describe('ChangePasswordComponent', () => {
    let component: ChangePasswordComponent;
    let fixture: ComponentFixture<ChangePasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AccountModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                HttpClientModule,
                JwtModule.forRoot({config: { tokenGetter: tokenGetter}})
            ],
            providers: [
                { provide: APP_CONFIG, useValue: AppConfig },
                { provide: AuthService, useClass: AuthServiceStub}
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangePasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
