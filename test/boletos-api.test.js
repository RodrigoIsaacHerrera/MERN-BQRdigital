const assert = require('node:assert/strict');
const { after, before, test } = require('node:test');
const express = require('express');
const createBoletosRouter = require('../src/routes/boletosurl');

const API_TOKEN = 'test-token-for-api';
const records = new Map();
let nextId = 1;
let lastUpdateOptions;

class FakeTicket {
    constructor(fields) {
        Object.assign(this, fields);
        this._id = String(nextId++);
    }

    async save() {
        records.set(this._id, this);
        return this;
    }

    static async find() {
        return Array.from(records.values());
    }

    static async findById(id) {
        return records.get(id) || null;
    }

    static async findByIdAndUpdate(id, fields, options) {
        lastUpdateOptions = options;
        const ticket = records.get(id);
        if (!ticket) {
            return null;
        }
        Object.assign(ticket, fields);
        return ticket;
    }

    static async findByIdAndDelete(id) {
        const ticket = records.get(id) || null;
        records.delete(id);
        return ticket;
    }
}

let server;
let baseUrl;

before(async () => {
    const app = express();
    app.use(express.json());
    app.use('/api/boletos', createBoletosRouter(FakeTicket, API_TOKEN));
    server = app.listen(0);
    await new Promise((resolve) => server.once('listening', resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}/api/boletos`;
});

after(async () => {
    await new Promise((resolve, reject) => {
        server.close((error) => error ? reject(error) : resolve());
    });
});

test('rejects missing or invalid tokens for every ticket operation', async () => {
    records.clear();
    records.set('protected', { _id: 'protected', Empresa: 'Private' });
    const responses = await Promise.all([
        fetch(baseUrl),
        fetch(baseUrl, { headers: { Authorization: 'Basic test-token-for-api' } }),
        fetch(baseUrl, { headers: { Authorization: 'Bearer incorrect-token' } }),
        fetch(`${baseUrl}/protected`),
        fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Empresa: 'Unauthorized' })
        }),
        fetch(`${baseUrl}/protected`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Empresa: 'Changed' })
        }),
        fetch(`${baseUrl}/protected`, { method: 'DELETE' })
    ]);

    assert.deepEqual(responses.map((response) => response.status), [401, 401, 401, 401, 401, 401, 401]);
    assert.equal(responses[0].headers.get('www-authenticate'), 'Bearer');
    assert.deepEqual(await responses[0].json(), { error: 'Unauthorized' });
    assert.equal(records.size, 1);
    assert.equal(records.get('protected').Empresa, 'Private');
});

test('requires a non-empty configured API token', () => {
    assert.throws(
        () => createBoletosRouter(FakeTicket, ''),
        /non-empty API token/
    );
});

test('allows authorized ticket listing and creation while ignoring unknown fields', async () => {
    records.clear();
    const headers = {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
    };

    const listResponse = await fetch(baseUrl, { headers });
    assert.equal(listResponse.status, 200);
    assert.deepEqual(await listResponse.json(), []);

    const createResponse = await fetch(baseUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({ Empresa: 'BQR', Salida: '08:00', unexpected: 'ignored' })
    });
    const created = await createResponse.json();
    assert.equal(createResponse.status, 201);
    assert.equal(created.Empresa, 'BQR');
    assert.equal(created.Salida, '08:00');
    assert.equal(Object.hasOwn(created, 'unexpected'), false);
});

test('updates canonical Salida field and enables schema validators', async () => {
    const headers = {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
    };
    const createResponse = await fetch(baseUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({ Empresa: 'BQR', Salida: '08:00' })
    });
    const created = await createResponse.json();
    const updateResponse = await fetch(`${baseUrl}/${created._id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ Salida: '09:00' })
    });

    assert.equal(updateResponse.status, 200);
    assert.equal((await updateResponse.json()).Salida, '09:00');
    assert.deepEqual(lastUpdateOptions, { new: true, runValidators: true });
});

test('returns 404 for unknown tickets and deletes existing tickets', async () => {
    const headers = {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
    };
    const missingResponse = await fetch(`${baseUrl}/missing`, { headers });
    assert.equal(missingResponse.status, 404);

    const createResponse = await fetch(baseUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({ Empresa: 'BQR' })
    });
    const created = await createResponse.json();
    const deleteResponse = await fetch(`${baseUrl}/${created._id}`, {
        method: 'DELETE',
        headers
    });

    assert.equal(deleteResponse.status, 200);
    assert.deepEqual(await deleteResponse.json(), { status: 'Ticket deleted' });
    assert.equal(records.has(created._id), false);
});
