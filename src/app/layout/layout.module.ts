import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {FooterComponent} from './components/footer/footer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/modules/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LayoutRoutingModule,
        SharedModule,
    ],
    declarations: [
        LayoutComponent,
        FooterComponent
    ]
})
export class LayoutModule {
}
