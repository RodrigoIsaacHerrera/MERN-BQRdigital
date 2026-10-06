const assert = require('node:assert/strict');
const { after, before, test } = require('node:test');
const createApp = require('../src/indexserver');

let databaseReady = false;
let server;
let baseUrl;

before(async () => {
    const app = createApp({
        apiToken: 'health-test-token',
        ticketModel: class Ticket {},
        isDatabaseReady: () => databaseReady
    });
    server = app.listen(0, '127.0.0.1');
    await new Promise((resolve) => server.once('listening', resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
    await new Promise((resolve, reject) => {
        server.close((error) => error ? reject(error) : resolve());
    });
});

test('health endpoint reports whether MongoDB is ready', async () => {
    let response = await fetch(`${baseUrl}/healthz`);
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { status: 'unavailable' });

    databaseReady = true;
    response = await fetch(`${baseUrl}/healthz`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: 'ok' });
});
