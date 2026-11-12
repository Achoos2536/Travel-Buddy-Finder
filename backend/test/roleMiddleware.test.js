const assert = require('assert');
const { authorizeRoles } = require('../middleware/authMiddleware');

describe('TBF-9 Role-Based Access Control', () => {
    const middleware = authorizeRoles('tripCreator');

    function mockResponse() {
        return {
            statusCode: 200,
            status(code) {
                this.statusCode = code;
                return this;
            },
            json(body) {
                this.body = body;
                return this;
            }
        };
    }

    it('denies travellers with 403', () => {
        const req = { user: { role: 'traveller' } };
        const res = mockResponse();
        let nextCalled = false;

        middleware(req, res, () => { nextCalled = true; });

        assert.strictEqual(res.statusCode, 403);
        assert.strictEqual(nextCalled, false);
    });

    it('allows trip creators', () => {
        const req = { user: { role: 'tripCreator' } };
        const res = mockResponse();
        let nextCalled = false;

        middleware(req, res, () => { nextCalled = true; });

        assert.strictEqual(nextCalled, true);
    });

    it('rejects unauthenticated requests with 401', () => {
        const req = {};
        const res = mockResponse();

        middleware(req, res, () => {});

        assert.strictEqual(res.statusCode, 401);
    });
});