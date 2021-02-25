import { expect } from 'chai';
import request from './requestDecorator';

class MockRepository {
    static loadData(isSuccess = true) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (isSuccess) resolve(10)
                else reject("ERROR OCCURED");
            }, 10);
        })
    }
}
class Mock {
    data: any;

    @request
    async successfulRequest() {
        const data = await MockRepository.loadData();
        this.data = data;
    }

    @request
    async failedRequest() {
        const data = await MockRepository.loadData(false);
        this.data = data;
    }
}

describe('requestDecorator', () => {

    it('can resolve async function', async () => {
        const mock = new Mock();
        await mock.successfulRequest()
        expect(mock.data).to.eq(10);
    })

    it('can handle async error', async () => {
        const mock = new Mock();
        expect(await mock.failedRequest).not.throw();
    })
})