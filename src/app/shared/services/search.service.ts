import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APP_CONFIG, IAppConfig} from '../../app.config';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {
    DraggedOperatorModel,
    DraggedOperator,
    SearchModel,
    SearchParameterModel
} from '../models';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    private searchListSubject = new Subject<SearchModel[]>();
    public searchListObservable: Observable<SearchModel[]> = this.searchListSubject.asObservable();

    public operatorListChangedSubject = new Subject<DraggedOperatorModel[]>();
    public operatorListChangedObservable: Observable<DraggedOperatorModel[]> = this.operatorListChangedSubject.asObservable();

    public operatorList = [
        // company data operators
        new DraggedOperatorModel(
            DraggedOperator.labelEducation,
            DraggedOperator.keyEducation,
            DraggedOperator.corporateData,
            DraggedOperator.typeText,
            false,
            ['']
        ),
        new DraggedOperatorModel(
            DraggedOperator.labelActive,
            DraggedOperator.keyActive,
            DraggedOperator.corporateData,
            DraggedOperator.typeBool,
            true,
            ['ACTIVE']
        ),
        new DraggedOperatorModel(
            DraggedOperator.labelMyTrackingPeople,
            DraggedOperator.keyMyTrackingPeople,
            DraggedOperator.corporateData,
            DraggedOperator.typeBool,
            false,
            ['']
        ),
        new DraggedOperatorModel(
            DraggedOperator.labelLanguage,
            DraggedOperator.keyLanguage,
            DraggedOperator.corporateData,
            DraggedOperator.typeText,
            false,
            ['']
        ),
        new DraggedOperatorModel(
            DraggedOperator.labelSkills,
            DraggedOperator.keySkills,
            DraggedOperator.corporateData,
            DraggedOperator.typeText,
            false,
            []
        ),
        new DraggedOperatorModel(
            DraggedOperator.labelRecommendations,
            DraggedOperator.keyRecommendations,
            DraggedOperator.corporateData,
            DraggedOperator.typeRange,
            true,
            ['']
        ),
        new DraggedOperatorModel(
            DraggedOperator.labelConnections,
            DraggedOperator.keyConnections,
            DraggedOperator.corporateData,
            DraggedOperator.typeRange,
            true,
            ['']
        ),
        new DraggedOperatorModel(
            DraggedOperator.labelHeadline,
            DraggedOperator.keyHeadline,
            DraggedOperator.corporateData,
            DraggedOperator.typeText,
            false,
            ['']
        ),
        // logical operators
        new DraggedOperatorModel(
            DraggedOperator.labelAnd,
            DraggedOperator.keyAnd,
            DraggedOperator.logical,
            DraggedOperator.typeOperator,
            false,
            ['AND']
        ),
        new DraggedOperatorModel(
            DraggedOperator.labelOr,
            DraggedOperator.keyOr,
            DraggedOperator.logical,
            DraggedOperator.typeOperator,
            false,
            ['OR']
        ),
        new DraggedOperatorModel(
            DraggedOperator.labelNot,
            DraggedOperator.keyNot,
            DraggedOperator.logical,
            DraggedOperator.typeOperator,
            false,
            ['NOT']
        ),
        new DraggedOperatorModel(
            DraggedOperator.labelGroupMore,
            DraggedOperator.keyGroupLess,
            DraggedOperator.logical,
            DraggedOperator.typeOperator,
            false,
            ['GROUP<']
        ),
        new DraggedOperatorModel(
            DraggedOperator.labelGroupLess,
            DraggedOperator.keyGroupMore,
            DraggedOperator.logical,
            DraggedOperator.typeOperator,
            false,
            ['GROUP>']
        ),
    ];

    constructor(
        private httpClient: HttpClient,
        @Inject(APP_CONFIG) private config: IAppConfig,
        private authService: AuthService) {
    }

    public announceOperatorsListChanged(operators: DraggedOperatorModel[]) {
        this.operatorListChangedSubject.next(operators);
    }

    public getcorporateDataOperatorList(): DraggedOperatorModel[] {
        return this.operatorList.filter(x => x.operatorType === DraggedOperator.corporateData);
    }

    public getLogicalOperatorList(): DraggedOperatorModel[] {
        return this.operatorList.filter(x => x.operatorType === DraggedOperator.logical);
    }

    getSearchListByUser() {
        const url = this.config.javaApiEndpoint + 'searches/' + this.authService.getUser().id;
        return this.httpClient.get(url)
            .pipe(map((res: SearchModel[]) => {
                this.searchListSubject.next(res);
            }));
    }

    // saveSearch(searchData: SearchModel): Observable<any> {
    saveSearch(searchData: SearchModel): Observable<any> {
        // const url = this.config.javaApiEndpoint + 'searches/' + this.authService.getUser().id;
        const url = this.config.javaApiEndpoint + 'searches/' + this.authService.getUser().id; // test
        return this.httpClient.post(url, searchData)
            .pipe(map(res => {
            }));
    }

    updateSearch(searchData: SearchModel): Observable<any> {
        const url = this.config.javaApiEndpoint + 'searches/' + this.authService.getUser().id + '/' + searchData.id;

        return this.httpClient.put(url, searchData)
            .pipe(map(res => {
            }));
    }

    deleteSearch(searchData: SearchModel): Observable<any> {
        const url = this.config.javaApiEndpoint + 'searches/' + this.authService.getUser().id + '/' + searchData.id;

        return this.httpClient.delete(url)
            .pipe(map(res => {
            }));
    }

    // Skills autocomplete
    getAutocompleteSkills(search: string): Observable<any> {
        const url = this.config.javaApiEndpoint + 'autocomplete/skills/' + search;
        return this.httpClient.get(url)
            .pipe(map((res: string[]) => {
                return res;
                // return this.transformAutocompleteRessponse(res);
            }));
    }

    // Education autocomplete
    getAutocompleteEducation(search: string): Observable<any> {
        const url = this.config.javaApiEndpoint + 'autocomplete/education/' + search;
        return this.httpClient.get(url)
            .pipe(map((res: string[]) => {
                return this.transformAutocompleteRessponse(res);
            }));
    }

    // Language autocomplete
    getAutocompleteLanguage(search: string): Observable<any> {
        const url = this.config.javaApiEndpoint + 'autocomplete/language/' + search;
        return this.httpClient.get(url)
            .pipe(map((res: string[]) => {
                return this.transformAutocompleteRessponse(res);
            }));
    }

    // Headline autocomplete
    getAutocompleteHeadline(search: string): Observable<any> {
        const url = this.config.javaApiEndpoint + 'autocomplete/headline/' + search;
        return this.httpClient.get(url)
            .pipe(map((res: string[]) => {
                return this.transformAutocompleteRessponse(res);
            }));
    }

    // Used to transform autocomplete response into necessary format
    transformAutocompleteRessponse(res: string[]): object {
        const suggestions = [];
        if (res !== null) {
            for (let i = 0; i < res.length; i++) {
                suggestions.push({
                    id: i,
                    payload: {
                        'label': res[i]
                    }
                });
            }
        }
        return suggestions;
    }

    // Transforms search parameter from search get response to item used in building search option
    searchParameterToDraggedOperator(searchParameter: SearchParameterModel): DraggedOperatorModel {
        const draggedOperator: DraggedOperatorModel = this.operatorList.find(x => x.key === searchParameter.parameterKey);
        draggedOperator.value = searchParameter.parameterValue;

        return draggedOperator;
    }

    // Transforms DraggedOperatorModel into SearchParameterModel
    draggedOperatorToSearchParameter(draggedOperator: DraggedOperatorModel): SearchParameterModel {
        return new SearchParameterModel(draggedOperator.searchParamType, draggedOperator.key, draggedOperator.value);
    }
}
