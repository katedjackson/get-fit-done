
import chai, {expect} from 'chai'                                                   

import { getTimeLeft, resetTime, decrementTime } from '../reducers/time'




describe('action creators for time', () => {

    describe('decrementTime', () => {

        it('returns expected action description for setting decrementing the time', () => {

            const timeLeft = 5;

            const actionDescriptor = decrementTime(timeLeft);

            expect(actionDescriptor).to.be.deep.equal({
                type: 'DECREMENT_TIME',
                payload: timeLeft
            });

        });
    });

    describe('getTimeLeft', () => {

        it('returns expected action description for getting the time left', () => {

            const timeLeft = 4;

            const actionDescriptor = getTimeLeft(timeLeft);

            expect(actionDescriptor).to.be.deep.equal({
                type: 'GET_TIME_LEFT',
                payload: timeLeft
            });

        });
    });


    describe('resetTime', () => {

        it('returns expected action description for resetting the time', () => {

            const timeLeft = 5;

            const actionDescriptor = resetTime(timeLeft);

            expect(actionDescriptor).to.be.deep.equal({
                type: 'RESET_TIME',
                payload: timeLeft
            });

        });
    });

    
});

