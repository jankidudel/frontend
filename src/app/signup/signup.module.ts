import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignupRoutingModule} from './signup-routing.module';
import {SignupComponent} from './signup.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SignupSuccessComponent} from './components/signup-success/signup-success.component';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {EmailConfirmComponent} from './components/email-confirm/email-confirm.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbAlertModule,
        SignupRoutingModule
    ],
    declarations: [
        SignupComponent,
        SignupSuccessComponent,
        EmailConfirmComponent
    ]
})
export class SignupModule {
}
