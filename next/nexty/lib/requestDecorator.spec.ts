import { expect } from 'chai';
import requestDecorator from './requestDecorator';

describe('requestDecorator', () => {
    it('can handle async error', () => {
        class Mock {
            @requestDecorator
            test() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject("ERROR OCCURED");
                    }, 10);
                });
            }
        }
        expect(new Mock().test).not.throw();
    })
})