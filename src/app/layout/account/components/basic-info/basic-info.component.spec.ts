import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BasicInfoComponent} from './basic-info.component';
import {AccountModule} from '../../account.module';
import {HttpClientModule} from '@angular/common/http';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {tokenGetter} from '../../../../app.module';
import {APP_CONFIG, AppConfig} from '../../../../app.config';
import {AuthService} from '../../../../shared/services';
import {AuthServiceStub} from '../../../../shared/test/stubs';

describe('BasicInfoComponent', () => {
    let component: BasicInfoComponent;
    let fixture: ComponentFixture<BasicInfoComponent>;

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
                JwtHelperService,
                { provide: APP_CONFIG, useValue: AppConfig },
                { provide: AuthService, useClass: AuthServiceStub}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BasicInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
