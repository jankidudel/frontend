import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordResetRoutingModule} from './password-reset-routing.module';
import {PasswordResetComponent} from './password-reset.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {PasswordChangeComponent} from './components/password-change.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbAlertModule,
        PasswordResetRoutingModule
    ],
    declarations: [
        PasswordResetComponent,
        PasswordChangeComponent
    ]
})
export class PasswordResetModule {
}
