import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PasswordChangeComponent} from './password-change.component';
import {PasswordResetModule} from '../password-reset.module';

describe('SignupComponent', () => {
    let component: PasswordChangeComponent;
    let fixture: ComponentFixture<PasswordChangeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                PasswordResetModule,
                RouterTestingModule,
                BrowserAnimationsModule,
            ],
        })
            .compileComponents();
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
