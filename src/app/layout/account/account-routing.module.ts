import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AccountComponent} from './account.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {BasicInfoComponent} from './components/basic-info/basic-info.component';

const routes: Routes = [
    {
        path: '',
        component: AccountComponent,
        children: [
            {
                path: '',
                redirectTo: 'basic',
                pathMatch: 'full'
            },
            {
                path: 'basic',
                component: BasicInfoComponent
            },
            {
                path: 'change-password',
                component: ChangePasswordComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {
}
