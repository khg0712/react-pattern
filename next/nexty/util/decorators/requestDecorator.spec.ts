import { expect } from 'chai';
import request from './requestDecorator';

class MockRepository {
    static loadData(isSuccess = true) {
        return new Promise<number>((resolve, reject) => {
            setTimeout(() => {
                if (isSuccess) resolve(10)
                else reject("ERROR OCCURED");
            }, 10);
        })
    }
}
class Mock {
    private _data = 0;

    get data() {
        return this._data;
    }

    @request
    async successfulRequest() {
        const data = await MockRepository.loadData();
        this._data = data;
    }

    @request
    async failedRequest() {
        const data = await MockRepository.loadData(false);
        this._data = data;
    }
}

describe('requestDecorator', () => {
    let model: Mock;
    beforeEach(() => {
        model = new Mock();
    })

    it('객체 상태를 변화시킬 수 있다.', async () => {
        await model.successfulRequest()
        expect(model.data).to.eq(10);
    })

    it('에러가 발생하는 메서드가 죽지 않는다.', async () => {
        expect(await model.failedRequest).not.throw();
    })
})