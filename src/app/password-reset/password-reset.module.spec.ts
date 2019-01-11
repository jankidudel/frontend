import {PasswordResetModule} from './password-reset.module';

describe('SignupModule', () => {
    let signupModule: PasswordResetModule;

    beforeEach(() => {
        signupModule = new PasswordResetModule();
    });

    it('should create an instance', () => {
        expect(signupModule).toBeTruthy();
    });
});
