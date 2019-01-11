import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {
    DraggedOperatorModel,
    DraggedOperator,
    SearchModel
} from '../../../shared/models';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {SearchService} from '../../../shared/services';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
    public operators = 'operators';
    public savedSearchList: SearchModel[];
    public corporateDataList: DraggedOperatorModel[] = [];
    public logicalOperatorList = [];
    public tabs = {'operators': true, 'corporateData': true, 'savedSearches': true};
    public editableSearchItem: SearchModel = new SearchModel('', []);
    public operatorsLogicalDisabled = true;
    public operatorscorporateDataDisabled = false;
    private showSidebar = true;
    private ngUnsubscribe = new Subject();
    @Output() collapsedEvent = new EventEmitter<boolean>();
    @Output() searchItemLoadClicked = new EventEmitter();
    @Output() searchItemEditClicked = new EventEmitter();
    @Output() searchItemSelected = new EventEmitter();

    constructor(
        private searchService: SearchService,
        private modalService: NgbModal,
        public modal: NgbActiveModal) {
    }

    ngOnInit() {
        this.initOperatorListChangeCheck();
        this.populateSearchList();
        this.initSearchOperators();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    // Toggles possibility to add different type of operators
    initOperatorListChangeCheck() {
        // @todo: refactor & move at least part to the service
        this.searchService.operatorListChangedObservable
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((operators: DraggedOperatorModel[]) => {
                if (!operators.length) {
                    this.operatorsLogicalDisabled = true;
                    this.operatorscorporateDataDisabled = false;
                } else {
                    const lastOperator: DraggedOperatorModel = operators[operators.length - 1];
                    // Toggle operators
                    this.operatorsLogicalDisabled = lastOperator.operatorType === DraggedOperator.logical;
                    this.operatorscorporateDataDisabled = lastOperator.operatorType === DraggedOperator.corporateData;
                }
                // Toggle single-use operators
                const usedOperatorKeys: string[] = [];
                for (const operator of operators) {
                    if (operator.singleUse) {
                        usedOperatorKeys.push(operator.key);
                    }
                }

                for (const companyOperator of this.corporateDataList) {
                    if (companyOperator.singleUse && usedOperatorKeys.find(x => x === companyOperator.key)) {
                        companyOperator.isUsed = true;
                    } else {
                        companyOperator.isUsed = false;
                    }
                }
            });
    }

    initSearchOperators() {
        this.logicalOperatorList = this.searchService.getLogicalOperatorList();
        this.corporateDataList = this.searchService.getcorporateDataOperatorList();
    }

    onSidebarColllapseClick() {
        this.showSidebar = !this.showSidebar;
        this.collapsedEvent.emit(this.showSidebar);
    }

    onSearchItemClick(event, savedSearch: SearchModel) {
        this.editableSearchItem = savedSearch;
        this.searchItemLoadClicked.emit(savedSearch);
    }

    onSearchItemEditClick(event, savedSearch: SearchModel) {
        this.editableSearchItem = savedSearch;
    }

    onSearchItemEditFinish(event, savedSearch: SearchModel) {
        this.editableSearchItem = new SearchModel('', []);

        this.searchService.updateSearch(savedSearch)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(data => {
            });
    }

    onSearchItemDelete(event, savedSearch: SearchModel) {
        const confirmModal = this.modalService.open(ConfirmModalComponent);
        confirmModal.componentInstance.confirmModalObservable.subscribe(data => {
            this.searchService.deleteSearch(savedSearch)
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(deletedRes => {
                        this.searchService.getSearchListByUser()
                            .pipe(takeUntil(this.ngUnsubscribe))
                            .subscribe();
                    }
                );
        });
    }

    populateSearchList() {
        this.searchService.searchListObservable.subscribe((data: SearchModel[]) => {
            this.savedSearchList = data;
        });

        this.searchService.getSearchListByUser()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(data => {
            });
    }

    toggleTabCollapse(operator) {
        this.tabs[operator] = !this.tabs[operator];
    }
}
