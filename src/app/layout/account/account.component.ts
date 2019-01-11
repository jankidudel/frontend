import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services';
import {UserModel} from '../../shared/models';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    public showSidebar = true;
    public contentColSize = 9;
    public user: UserModel;

    constructor(
        public router: Router,
        private authService: AuthService) {
    }

    ngOnInit() {
        this.user = this.authService.getUser();
    }

    receiveCollapsed($event) {
        this.showSidebar = $event;
        this.onResizeContentCol();
    }

    onResizeContentCol() {
        this.contentColSize = this.showSidebar ? 9 : 12;
    }

    onSidebarExpandClick() {
        this.showSidebar = true;
        this.onResizeContentCol();
    }
}
