import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PasswordResetComponent} from './password-reset.component';
import {PasswordChangeComponent} from './components/password-change.component';

const routes: Routes = [
    {path: '', component: PasswordResetComponent},
    {path: 'change', component: PasswordChangeComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PasswordResetRoutingModule {
}
