import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AccountSidebarComponent} from './account-sidebar.component';
import {AccountModule} from '../../account.module';

describe('AccountSidebarComponent', () => {
    let component: AccountSidebarComponent;
    let fixture: ComponentFixture<AccountSidebarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AccountModule,
                RouterTestingModule,
                BrowserAnimationsModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
