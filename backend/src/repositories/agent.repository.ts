import prisma from '../config/prisma';

export class AgentRepository {
  async findAll() {
    return await prisma.agent.findMany({
      orderBy: { name: 'asc' }
    });
  }

  async findById(id: string) {
    return await prisma.agent.findUnique({
      where: { id },
      include: { tickets: true }
    });
  }

  async create(data: { name: string, email: string }) {
    return await prisma.agent.create({ data });
  }

  async delete(id: string) {
    return await prisma.agent.delete({
      where: { id }
    });
  }
}
