import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APP_CONFIG, IAppConfig} from '../../app.config';
import {Subject} from 'rxjs';
import {SearchParameterModel} from '../models';

@Injectable({
    providedIn: 'root',
})

export class ChartService {

    private bubbleMapChartSubject = new Subject();
    public bubbleMapChartObservable = this.bubbleMapChartSubject.asObservable();

    constructor(
        private httpClient: HttpClient,
        @Inject(APP_CONFIG) private config: IAppConfig) {
    }

    getBubbleMapChartData(searchParameters: SearchParameterModel[] = []) {
        const url = this.config.javaApiEndpoint + 'chart/bubbleMapData';
        const sampleResJson = '[{"docCount":25489214,"lat":26.104035805910826,"lon":-81.15789790637791},{"docCount":16276097,"lat":52.29089742992073,"lon":-2.3216021060943604},{"docCount":15040827,"lat":42.01553289312869,"lon":-84.19406119734049},{"docCount":14876255,"lat":47.68672707024962,"lon":5.235511735081673},{"docCount":14876195,"lat":41.34964001365006,"lon":-73.77565948292613},{"docCount":12649518,"lat":52.02585599385202,"lon":5.724126482382417},{"docCount":9800437,"lat":36.06339291203767,"lon":-119.96498457156122},{"docCount":7366639,"lat":35.914592295885086,"lon":-83.73131501488388},{"docCount":6733221,"lat":31.21619869954884,"lon":-95.78018146567047},{"docCount":6262680,"lat":21.69401349965483,"lon":79.41177648492157},{"docCount":6148572,"lat":-9.998791990801692,"lon":-54.992454685270786},{"docCount":5843578,"lat":29.426421434618533,"lon":74.43028000183403},{"docCount":5569995,"lat":-24.006234244443476,"lon":-47.543623466044664},{"docCount":5365857,"lat":38.05346698500216,"lon":-77.17783777043223},{"docCount":5302257,"lat":40.90990194585174,"lon":-3.89448668807745},{"docCount":5182124,"lat":47.33494571875781,"lon":14.73713792860508},{"docCount":5058071,"lat":18.753390284255147,"lon":74.58507757633924},{"docCount":4481759,"lat":24.447446605190635,"lon":50.61806573532522},{"docCount":4041413,"lat":-29.5368589181453,"lon":-62.2636295389384},{"docCount":3758977,"lat":3.375247735530138,"lon":-74.80150007642806},{"docCount":3442130,"lat":47.683088150806725,"lon":-121.69932279735804},{"docCount":3441632,"lat":42.754905936308205,"lon":4.875280419364572},{"docCount":3384299,"lat":12.999919387511909,"lon":77.16759726405144},{"docCount":3352107,"lat":53.06717653758824,"lon":15.932251056656241},{"docCount":3255662,"lat":37.287971656769514,"lon":-93.84269080124795}]';
        const sampleResObj = JSON.parse(sampleResJson);
        for (let i = 0; i < (<any>sampleResObj).length; i++) {
            sampleResObj[i]['z'] = sampleResObj[i]['docCount'];
        }
        this.bubbleMapChartSubject.next(sampleResObj);

        // In reality it's of course a service call
        // For the sake of sample I return test data
        /*
         return this.httpClient.post(url, searchParameters)
            .pipe(map(res => {
                for (let i = 0; i < (<any>res).length; i++) {
                    res[i]['z'] = res[i]['docCount'];
                }

                this.bubbleMapChartSubject.next(res);
            }));
        */
    }

    // without a "hack" below chart won't resize to fit 100% of bootstrap column
    chartResizeFix(chart) {
        setTimeout(function () {
            if (chart.renderTo !== undefined) {
                chart.reflow();
            }
        }, 100);
    }
}
