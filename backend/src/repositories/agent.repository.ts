import prisma from '../config/prisma';

export class AgentRepository {
  async findAll() {
    return await prisma.agent.findMany({
      orderBy: { name: 'asc' }
    });
  }

  async findById(id: string) {
    return await prisma.agent.findUnique({
      where: { id }
    });
  }
}
