const express = require('express');
const createApiAuth = require('../middleware/apiAuth');

const ticketFields = [
    'Empresa',
    'Asiento',
    'Origen',
    'Destino',
    'Fecha',
    'Abordaje',
    'Salida',
    'Condiciones_Legales',
    'Cod_QR',
    'Tarifa'
];

function pickTicketFields(body) {
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return {};
    }

    return ticketFields.reduce((ticket, field) => {
        if (Object.prototype.hasOwnProperty.call(body, field)) {
            ticket[field] = body[field];
        }
        return ticket;
    }, {});
}

function createBoletosRouter(boletos, apiToken) {
    if (!boletos) {
        throw new Error('A ticket model is required.');
    }

    const router = express.Router();
    router.use(createApiAuth(apiToken));

    router.get('/', async (req, res, next) => {
        try {
            res.json(await boletos.find());
        } catch (error) {
            next(error);
        }
    });

    router.get('/:id', async (req, res, next) => {
        try {
            const ticket = await boletos.findById(req.params.id);
            if (!ticket) {
                return res.status(404).json({ error: 'Ticket not found' });
            }
            return res.json(ticket);
        } catch (error) {
            return next(error);
        }
    });

    router.post('/', async (req, res, next) => {
        try {
            const ticket = new boletos(pickTicketFields(req.body));
            await ticket.save();
            return res.status(201).json(ticket);
        } catch (error) {
            return next(error);
        }
    });

    router.put('/:id', async (req, res, next) => {
        try {
            const ticket = await boletos.findByIdAndUpdate(
                req.params.id,
                pickTicketFields(req.body),
                { new: true, runValidators: true }
            );
            if (!ticket) {
                return res.status(404).json({ error: 'Ticket not found' });
            }
            return res.json(ticket);
        } catch (error) {
            return next(error);
        }
    });

    router.delete('/:id', async (req, res, next) => {
        try {
            const ticket = await boletos.findByIdAndDelete(req.params.id);
            if (!ticket) {
                return res.status(404).json({ error: 'Ticket not found' });
            }
            return res.json({ status: 'Ticket deleted' });
        } catch (error) {
            return next(error);
        }
    });

    router.use((error, req, res, next) => {
        if (res.headersSent) {
            return next(error);
        }

        console.error('Ticket API request failed:', error);
        const isInvalidTicket = error.name === 'ValidationError' || error.name === 'CastError';
        const status = isInvalidTicket ? 400 : 500;
        const message = isInvalidTicket ? 'Invalid ticket data' : 'Internal server error';
        return res.status(status).json({ error: message });
    });

    return router;
}

module.exports = createBoletosRouter;
