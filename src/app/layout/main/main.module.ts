import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HighchartsChartModule} from 'highcharts-angular';
import {MainRoutingModule} from './main-routing.module';
import {SharedModule} from '../../shared/modules/shared.module';
import {MainComponent} from './main.component';
import {ChartAreaComponent} from './components/chart-area/chart-area.component';
import {BubbleChartComponent} from './components/charts/bubble-chart/bubble-chart.component';
import {SidebarComponent} from '../components/sidebar/sidebar.component';
import {AutocompleteModule} from 'ng2-input-autocomplete';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HighchartsChartModule,
        SharedModule,
        MainRoutingModule,
        AutocompleteModule.forRoot(),
        NgSelectModule,
        NgbModule,
    ],
    declarations: [
        SidebarComponent,
        MainComponent,
        ChartAreaComponent,
        BubbleChartComponent,
    ]
})
export class MainModule {
}
