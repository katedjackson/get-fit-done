
import chai, {expect} from 'chai'                                                   

import { setWebsites } from '../reducers/settings'




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
});