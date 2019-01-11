import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HighchartsChartModule} from 'highcharts-angular';
import {AccountRoutingModule} from './account-routing.module';
import {AccountComponent} from './account.component';
import {BasicInfoComponent} from './components/basic-info/basic-info.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {AccountSidebarComponent} from './components/account-sidebar/account-sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HighchartsChartModule,
        AccountRoutingModule,
    ],
    declarations: [
        AccountSidebarComponent,
        AccountComponent,
        BasicInfoComponent,
        ChangePasswordComponent,
    ]
})
export class AccountModule {
}
