import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SignupComponent} from './signup.component';
import {SignupModule} from './signup.module';
import {HttpClientModule} from '../../../node_modules/@angular/common/http';
import {APP_CONFIG, AppConfig} from '../app.config';
import {JwtModule} from '@auth0/angular-jwt';
import {tokenGetter} from '../app.module';

describe('SignupComponent', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SignupModule,
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
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
