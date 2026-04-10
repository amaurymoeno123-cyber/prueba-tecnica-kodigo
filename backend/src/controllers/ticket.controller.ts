import { Request, Response, NextFunction } from 'express';
import { TicketService } from '../services/ticket.service';

const ticketService = new TicketService();

export class TicketController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tickets = await ticketService.getAllTickets();
      res.json(tickets);
    } catch (error) {
      next(error);
    }
  }

  async getDashboardCounters(req: Request, res: Response, next: NextFunction) {
    try {
      const counters = await ticketService.getDashboardCounters();
      res.json(counters);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await ticketService.getTicketById(req.params.id as string);
      res.json(ticket);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await ticketService.createTicket(req.body);
      res.status(201).json(ticket);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await ticketService.updateTicket(req.params.id as string, req.body);
      res.json(ticket);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await ticketService.deleteTicket(req.params.id as string);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
