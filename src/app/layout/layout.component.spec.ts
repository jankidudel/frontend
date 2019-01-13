import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {LayoutComponent} from './layout.component';
import {LayoutModule} from './layout.module';
import {AuthService} from '../shared/services';
import {UserModel} from '../shared/models';
import {HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {tokenGetter} from '../app.module';
import {APP_CONFIG, AppConfig} from '../app.config';
import {AuthServiceStub} from '../shared/test/stubs';

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                LayoutModule,
                RouterTestingModule,
                HttpClientModule,
                JwtModule.forRoot({config: { tokenGetter: tokenGetter}})
            ],
            providers: [
                { provide: APP_CONFIG, useValue: AppConfig },
                { provide: AuthService, useClass: AuthServiceStub}
            ]
        }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
