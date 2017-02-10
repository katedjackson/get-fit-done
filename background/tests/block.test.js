
import chai, {expect} from 'chai'                                                   

import { setBlock, unblock, toggleHourlyBlock, toggleTimeStepsBlock, toggleSleepBlock, resetBlock } from '../reducers/block'




describe('action creators for blocking', () => {

    describe('setBlock', () => {

        it('returns expected action description for setting block', () => {

            const block = true;

            const actionDescriptor = setBlock(block);

            expect(actionDescriptor).to.be.deep.equal({
                type: 'SET_BLOCK',
                payload: block
            });

        });
    });

    describe('unblock', () => {

        it('returns expected action description for unblocking', () => {

            const block = false;

            const actionDescriptor = unblock(block);

            expect(actionDescriptor).to.be.deep.equal({
                type: 'UNBLOCK',
                payload: block
            });

        });
    });

    describe('toggleHourlyBlock', () => {

        it('returns expected action description for toggling hourly block', () => {

            const hourlyBlock = false;

            const actionDescriptor = toggleHourlyBlock(hourlyBlock);

            expect(actionDescriptor).to.be.deep.equal({
                type: 'TOGGLE_HOURLY_BLOCK',
                payload: hourlyBlock
            });

        });
    });

    describe('toggleTimeStepsBlock', () => {

        it('returns expected action description for toggling time steps block', () => {

            const timeSteps = false;

            const actionDescriptor = toggleTimeStepsBlock(timeSteps);

            expect(actionDescriptor).to.be.deep.equal({
                type: 'TOGGLE_TIME_STEPS_BLOCK',
                payload: timeSteps
            });

        });
    });

    describe('toggleSleepBlock', () => {

        it('returns expected action description for toggling sleep block', () => {

            const sleepBlock = false;

            const actionDescriptor = toggleSleepBlock(sleepBlock);

            expect(actionDescriptor).to.be.deep.equal({
                type: 'TOGGLE_SLEEP_BLOCK',
                payload: sleepBlock
            });

        });
    });

    describe('resetBlock', () => {

        it('returns expected action description for reseting block', () => {

            const block = true;

            const actionDescriptor = resetBlock(block);

            expect(actionDescriptor).to.be.deep.equal({
                type: 'RESET_BLOCK',
                payload: block
            });

        });
    });
});

