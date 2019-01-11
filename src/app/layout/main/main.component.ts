import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {first, takeUntil} from 'rxjs/operators';
import {DragulaService} from 'ng2-dragula';
import {
    DraggedOperatorModel,
    DraggedOperator,
    SearchParameterModel,
    SearchModel,
    UserModel
} from '../../shared/models';
import {ChartService, AuthService, SearchService} from '../../shared/services';

@Component({
    selector: 'app-layout',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    providers: [DatePipe]
})
export class MainComponent implements OnInit, OnDestroy {
    public user: UserModel;
    public showSidebar = true;
    public showAccountBlock = false;
    public contentColSize = 9;
    public operators = 'operators';
    public dragError = false;
    public draggedOperators: DraggedOperatorModel[] = [];
    // 'Skills' autocomplete
    public autocompleteSkillList = [];
    public autocompleteSkillsSearch = '';
    // 'Education' autocomplete
    public autocompleteEducationList = [];
    public autocompleteEducationConfig = {'placeholder': 'e.g. Bachelors', 'sourceField': ['payload', 'label']};
    public autocompleteEducationSearch = '';
    // 'Language' autocomplete
    public autocompleteLanguageList = [];
    public autocompleteLanguageConfig = {'placeholder': 'e.g. English', 'sourceField': ['payload', 'label']};
    public autocompleteLanguageSearch = '';
    // 'Headline' autocomplete
    public autocompleteHeadlineList = [];
    public autocompleteHeadlineConfig = {'placeholder': 'e.g. Sales manager', 'sourceField': ['payload', 'label']};
    public autocompleteHeadlineSearch = '';

    private autocompleteMinStrLen = 3;
    private nextPosition = 1;
    private ngUnsubscribe = new Subject();

    constructor(
        public router: Router,
        private dragulaService: DragulaService,
        private authService: AuthService,
        private searchService: SearchService,
        private chartService: ChartService,
        private formBuilder: FormBuilder,
        private datePipe: DatePipe) {
    }

    ngOnInit() {
        this.user = this.authService.getUser();
        this.initDragulaDropChanges();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    initDragulaDropChanges() {
        if (!this.dragulaService.find('operators')) {
            this.dragulaService.createGroup('operators', {
                removeOnSpill: false,
                copy: true,
                copySortSource: false,
                accepts: function (el, target, source, sibling) {
                    if (source.getAttribute('data-type') === 'operator-sender'
                        && target.getAttribute('data-type') === 'operator-receiver') {
                        return true;
                    }
                    return false;
                }
            });
        }

        // @todo: refactor & move at least part to the service
        this.dragulaService.drop(this.operators)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(({name, el, target, source, sibling}) => {
                if (source.getAttribute('data-type') === 'operator-sender'
                    && (target && target.getAttribute('data-type') === 'operator-receiver')) {

                    // Check if the operator position order is valid

                    const draggedOperator: DraggedOperatorModel = JSON.parse(el.getAttribute('data-object')) as DraggedOperatorModel;
                    let dragError = false;
                    if (this.draggedOperators.length === 0) {
                        if (draggedOperator.operatorType === DraggedOperator.logical) {
                            dragError = true;
                        }
                    } else {
                        // Same operator type not allowed
                        if (this.draggedOperators[this.draggedOperators.length - 1].operatorType === draggedOperator.operatorType) {
                            dragError = true;
                        }
                        // Check if single-use operators not repeating
                        if (draggedOperator.singleUse) {
                            if (this.draggedOperators.find(x => x.key === draggedOperator.key)) {
                                dragError = true;
                            }
                        }
                    }
                    if (dragError) {
                        el.remove();
                        this.onDragError();
                        return false;
                    }
                    el.classList.add('operator-moved');
                    draggedOperator.position = this.getNextOperatorPosition();
                    this.draggedOperators.push(draggedOperator);
                    this.searchService.announceOperatorsListChanged(this.draggedOperators);
                }
                el.remove();
            });
    }

    getNextOperatorPosition(): string {
        const nextPositionStr = 'pos-' + this.nextPosition;
        this.nextPosition++;
        return nextPositionStr;
    }

    onInputSelectEvent(event) {
        this.updateSearchData();
    }

    onInputChangedEvent(searchStr: string) {
        if (searchStr.length < this.autocompleteMinStrLen) {
            return;
        }

        // @todo: Think about putting the same json config inside input ???
        const operator = (<HTMLInputElement>event.target).closest('.operator');

        const droppedOperator: DraggedOperatorModel = JSON.parse(operator.getAttribute('data-object')) as DraggedOperatorModel;
        switch (droppedOperator.key) {
            case 'skills': // @todo: refactor into class property, also 'education', 'industry', ...
                if (this.autocompleteSkillsSearch !== searchStr) {
                    this.autocompleteSkillsSearch = searchStr;
                    this.repopulateAutocompleteSkills();
                }
                break;
            case 'education':
                if (this.autocompleteEducationSearch !== searchStr) {
                    this.autocompleteEducationSearch = searchStr;
                    this.repopulateAutocompleteEducation();
                }
                break;
            case 'language':
                if (this.autocompleteLanguageSearch !== searchStr) {
                    this.autocompleteLanguageSearch = searchStr;
                    this.repopulateAutocompleteLanguage();
                }
                break;
            case 'headline':
                if (this.autocompleteHeadlineSearch !== searchStr) {
                    this.autocompleteHeadlineSearch = searchStr;
                    this.repopulateAutocompleteHeadline();
                }
                break;
        }

        this.updateSearchData();
    }

    resolveAddedOperatorsProps(element) {
        // Check if the operator position order is valid
        const draggedOperator: DraggedOperatorModel = JSON.parse(element.getAttribute('data-object')) as DraggedOperatorModel;
        let dragError = false;
        if (this.draggedOperators.length === 0) {
            if (draggedOperator.operatorType === DraggedOperator.logical && draggedOperator.key !== DraggedOperator.keyNot) {
                dragError = true;
            }
        } else {
            // Same operator type not allowed
            if (this.draggedOperators[this.draggedOperators.length - 1].operatorType === draggedOperator.operatorType) {
                dragError = true;
            }
            // Check if single-use operators not repeating
            if (draggedOperator.singleUse) {
                if (this.draggedOperators.find(x => x.key === draggedOperator.key)) {
                    dragError = true;
                }
            }
        }

        if (dragError) {
            element.remove();
            this.onDragError();
            return false;
        }

        return true;
    }

    onSearchItemSelected(element) {
        if (this.resolveAddedOperatorsProps(element)) {
            const draggedOperator: DraggedOperatorModel = JSON.parse(element.getAttribute('data-object')) as DraggedOperatorModel;
            draggedOperator.position = this.getNextOperatorPosition();
            this.draggedOperators.push(draggedOperator);
            this.searchService.announceOperatorsListChanged(this.draggedOperators);
        }
        this.updateSearchData();
    }

    onSearchItemLoadClicked(search: SearchModel) {
        this.draggedOperators = [];
        for (const searchParameter of search.searchParameters) {
            const draggedOperator: DraggedOperatorModel = this.searchService.searchParameterToDraggedOperator(searchParameter);
            draggedOperator.position = this.getNextOperatorPosition();
            this.draggedOperators.push(draggedOperator);
        }
        this.updateSearchData();
        this.searchService.announceOperatorsListChanged(this.draggedOperators);
    }

    onSearchItemEditClicked(search: SearchModel) {
    }

    // When triggered to update chart's data
    updateSearchData() {
        // Check every operator values if they are not empty
        const searchParameters: SearchParameterModel[] = [];
        for (const draggedOperator of this.draggedOperators) {
            if (draggedOperator.value[0] === '') {
                return;
            }
            searchParameters.push(this.searchService.draggedOperatorToSearchParameter(draggedOperator));
        }

        // Send out new search params data.
        // this.chartService.chartsParamsSubject.next(searchParameters);
    }

    onSearchSaveClick() {
        const searchParameters: SearchParameterModel[] = [];
        for (const draggedOperator of this.draggedOperators) {
            searchParameters.push(this.searchService.draggedOperatorToSearchParameter(draggedOperator));
        }
        const searchName = this.datePipe.transform(new Date(), 'M/d/y - hh:mm:ss a');
        const searchData = new SearchModel(searchName, searchParameters);

        this.searchService.saveSearch(searchData)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                data => {
                    this.searchService.getSearchListByUser()
                        .pipe(first())
                        .subscribe();
                },
            );
    }

    // 'Skills' autocomplete
    repopulateAutocompleteSkills() {
        this.searchService.getAutocompleteSkills(this.autocompleteSkillsSearch)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                data => {
                    this.autocompleteSkillList = data;
                }
            );
    }

    // 'Education' autocomplete
    repopulateAutocompleteEducation() {
        this.searchService.getAutocompleteEducation(this.autocompleteEducationSearch)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                data => {
                    this.autocompleteEducationList = data;
                }
            );
    }

    // 'Languages' autocomplete
    repopulateAutocompleteLanguage() {
        this.searchService.getAutocompleteLanguage(this.autocompleteLanguageSearch)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                data => {
                    this.autocompleteLanguageList = data;
                }
            );
    }

    // 'Headline' autocomplete
    repopulateAutocompleteHeadline() {
        this.searchService.getAutocompleteHeadline(this.autocompleteHeadlineSearch)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                data => {
                    this.autocompleteHeadlineList = data;
                }
            );
    }

    onDragError() {
        this.dragError = true;
        setTimeout(() => {
            this.dragError = false;
        }, 500);
    }

    onRemoveButtonClick(event) {
        const operatorId = event.target.closest('.operator').id;
        for (let i = 0; i < this.draggedOperators.length; i++) {
            if (this.draggedOperators[i].position === operatorId) {
                this.draggedOperators.splice(i, 1);
                this.searchService.announceOperatorsListChanged(this.draggedOperators);
            }
        }
        this.updateSearchData();
    }

    onSidebarExpandClick() {
        this.showSidebar = true;
        this.onResizeContentCol();
    }

    receiveCollapsed($event) {
        this.showSidebar = $event;
        this.onResizeContentCol();
    }

    onResizeContentCol() {
        this.contentColSize = this.showSidebar ? 9 : 12;
    }

    logoutClick() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    toggleAccountClick() {
        this.showAccountBlock = !this.showAccountBlock;
    }


}
