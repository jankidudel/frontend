import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-account-sidebar',
    templateUrl: './account-sidebar.component.html',
    styleUrls: ['./account-sidebar.component.scss']
})
export class AccountSidebarComponent implements OnInit {
    private showSidebar = true;
    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit() {
    }

    onSidebarColllapseClick() {
        this.showSidebar = !this.showSidebar;
        this.collapsedEvent.emit(this.showSidebar);
    }
}
