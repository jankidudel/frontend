import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject} from 'rxjs';

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
    private confirmModalSubject = new Subject<string>();
    public confirmModalObservable: Observable<string> = this.confirmModalSubject.asObservable();

    constructor(public modal: NgbActiveModal) {
    }

    ngOnInit() {
    }

    onDeleteConfirmClick() {
        this.confirmModalSubject.next('Closed');
        this.modal.close('Deleted');
    }

}
