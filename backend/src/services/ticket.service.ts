import { TicketRepository } from '../repositories/ticket.repository';
import { Prisma, Status } from '@prisma/client';
import { AppError } from '../middlewares/errorHandler';

export class TicketService {
  private ticketRepository: TicketRepository;

  constructor() {
    this.ticketRepository = new TicketRepository();
  }

  async getAllTickets() {
    return await this.ticketRepository.findAll();
  }

  async getTicketById(id: string) {
    const ticket = await this.ticketRepository.findById(id);
    if (!ticket) {
      throw new AppError('Ticket no encontrado', 404);
    }
    return ticket;
  }

  async createTicket(data: Prisma.TicketCreateInput) {
    if (!data.title || !data.description || !data.clientName || !data.priority) {
      throw new AppError('Error de validación: Faltan campos requeridos', 400);
    }
    return await this.ticketRepository.create(data);
  }

  async updateTicket(id: string, data: Prisma.TicketUpdateInput) {
    const currentTicket = await this.ticketRepository.findById(id);
    if (!currentTicket) {
      throw new AppError('Ticket no encontrado', 404);
    }
    
    // Business rule: Un ticket Resuelto no puede modificarse
    if (currentTicket.status === Status.RESOLVED) {
      throw new AppError('No se puede modificar un ticket resuelto', 422);
    }

    return await this.ticketRepository.update(id, data);
  }

  async deleteTicket(id: string) {
    const currentTicket = await this.ticketRepository.findById(id);
    if (!currentTicket) {
      throw new AppError('Ticket no encontrado', 404);
    }

    // Business rule: Solo se puede eliminar un ticket en estado Abierto
    if (currentTicket.status !== Status.OPEN) {
      throw new AppError('No se puede eliminar un ticket que no esté ABIERTO', 422);
    }

    return await this.ticketRepository.delete(id);
  }

  async getDashboardCounters() {
    return await this.ticketRepository.getStatusCounters();
  }
}
