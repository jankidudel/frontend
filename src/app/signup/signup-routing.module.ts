import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignupComponent} from './signup.component';
import {SignupSuccessComponent} from './components/signup-success/signup-success.component';
import {EmailConfirmComponent} from './components/email-confirm/email-confirm.component';


const routes: Routes = [
    {path: '', component: SignupComponent},
    {path: 'success', component: SignupSuccessComponent},
    {path: 'email-confirm', component: EmailConfirmComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SignupRoutingModule {
}
