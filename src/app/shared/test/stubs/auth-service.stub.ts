import {AuthService} from '../../services';
import {UserModel} from '../../models';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class AuthServiceStub extends AuthService {
    getUser(): UserModel {
        const user = new UserModel();
        user.id = 1;
        user.userName = 'user1Name';
        user.niceName = 'user1NiceName';
        user.displayName = 'user1DisplayName';
        user.email = 'user1Name';

        return user;
    }

    passwordReset(data) {
        return new Observable();
    }

    passwordChange(data) {
        return new Observable();
    }
}
