import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragulaModule} from 'ng2-dragula';
import {Ng5SliderModule} from 'ng5-slider';

@NgModule({
    imports: [
        CommonModule,
        DragulaModule.forRoot(),
        Ng5SliderModule,
    ],
    declarations: [],
    exports: [
        DragulaModule,
        Ng5SliderModule,
    ]
})
export class SharedModule {
}
