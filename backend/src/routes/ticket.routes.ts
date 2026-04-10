import { Router } from 'express';
import { TicketController } from '../controllers/ticket.controller';

const router = Router();
const ticketController = new TicketController();

// Important to put /dashboard before /:id so it doesn't get matched as an ID
router.get('/dashboard', ticketController.getDashboardCounters.bind(ticketController));
router.get('/', ticketController.getAll.bind(ticketController));
router.get('/:id', ticketController.getById.bind(ticketController));
router.post('/', ticketController.create.bind(ticketController));
router.put('/:id', ticketController.update.bind(ticketController));
router.delete('/:id', ticketController.delete.bind(ticketController));

export default router;
