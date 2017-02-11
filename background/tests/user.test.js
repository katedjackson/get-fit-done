
import chai, {expect} from 'chai'                                                   

import { loginUser, addNewAchievement, resetStreak, resetLastSteps } from '../reducers/user'




describe('action creators for user', () => {

    describe('loginUser', () => {

        it('returns expected action description for logging in user', () => {

            const accessTocken = '553fe3a4f9u29d9s78.8uf9saal';

            const actionDescriptor = loginUser(accessTocken);

            expect(actionDescriptor).to.be.deep.equal({
                type: 'LOGIN_USER',
                payload: accessTocken
            });

        });
    });

    describe('addNewAchievement', () => {

        it('returns expected action description for adding new achievement', () => {

            const badge = 1;

            const actionDescriptor = addNewAchievement(badge);

            expect(actionDescriptor).to.be.deep.equal({
                type: 'ADD_ACHIEVEMENT',
                payload: badge
            });

        });
    });

    describe('resetStreak', () => {

        it('returns expected action description for resetting the streak', () => {

            const streak = 0;

            const actionDescriptor = resetStreak(streak);

            expect(actionDescriptor).to.be.deep.equal({
                type: 'RESET_STREAK',
                payload: streak
            });

        });
    });

    describe('resetLastSteps', () => {

        it('returns expected action description for setting whitelist', () => {

            const lastSteps = 200;

            const actionDescriptor = resetLastSteps(lastSteps);

            expect(actionDescriptor).to.be.deep.equal({
                type: 'RESET_LAST_STEPS',
                payload: lastSteps
            });

        });
    });
});

