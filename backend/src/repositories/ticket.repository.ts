import prisma from '../config/prisma';
import { Prisma } from '@prisma/client';

export class TicketRepository {
  async findAll() {
    return await prisma.ticket.findMany({
      include: { agent: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findById(id: string) {
    return await prisma.ticket.findUnique({
      where: { id },
      include: { agent: true }
    });
  }

  async create(data: Prisma.TicketCreateInput) {
    return await prisma.ticket.create({
      data,
      include: { agent: true }
    });
  }

  async update(id: string, data: Prisma.TicketUpdateInput) {
    return await prisma.ticket.update({
      where: { id },
      data,
      include: { agent: true }
    });
  }

  async delete(id: string) {
    return await prisma.ticket.delete({
      where: { id }
    });
  }

  async getStatusCounters() {
    const group = await prisma.ticket.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
    });

    const counters = { OPEN: 0, IN_PROGRESS: 0, RESOLVED: 0 };
    group.forEach(g => {
      counters[g.status] = g._count.id;
    });
    return counters;
  }
}
