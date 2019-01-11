import {SearchParameterModel} from './search-parameter.model';

export class SearchModel {
    id?: number;
    name: string;
    searchParameters: SearchParameterModel[];
    chartType: number[];

    constructor(name, searchParameters: SearchParameterModel[]) {
        this.name = name;
        this.searchParameters = searchParameters;
        this.chartType = [1, 2, 3]; // @todo: find out the usage
    }
}
