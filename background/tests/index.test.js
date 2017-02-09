
import chai, {expect} from 'chai'                                                   

import { setWebsites, setStepGoal, setTotalStepsTime } from '../reducers/settings'




describe('action creators', () => {

    describe('setWebsites', () => {

        it('returns expected action description for setting websites', () => {

            const websites = 'facebook.com, twitter.com';

            const actionDescriptor = setWebsites(websites);

            expect(actionDescriptor).to.be.deep.equal({
                type: 'SET_WEBSITES',
                payload: websites
            });

        });
    });

    describe('setStepGoal', () => {

        it('returns expected action description for setting step goal', () => {

            const stepGoal = 200;

            const actionDescriptor = setStepGoal(stepGoal);

            expect(actionDescriptor).to.be.deep.equal({
                type: 'SET_STEP_GOAL',
                payload: stepGoal
            });

        });
    });

    describe('setTotalStepsTime', () => {

        it('returns expected action description for setting total steps time', () => {

            const totalStepTime = '12:00';

            const actionDescriptor = setTotalStepsTime(totalStepTime);

            expect(actionDescriptor).to.be.deep.equal({
                type: 'SET_TOTAL_STEPS_TIME',
                payload: totalStepTime
            });

        });
    });
});