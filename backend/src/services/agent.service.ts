import { AgentRepository } from '../repositories/agent.repository';
import { AppError } from '../middlewares/errorHandler';
import prisma from '../config/prisma';

export class AgentService {
  private agentRepository: AgentRepository;

  constructor() {
    this.agentRepository = new AgentRepository();
  }

  async getAllAgents() {
    return await this.agentRepository.findAll();
  }

  async createAgent(data: { name: string, email: string }) {
    if (!data.name || !data.email) {
      throw new AppError('Error de validación: Nombre y email son requeridos', 400);
    }

    // Check if email exists
    const existing = await prisma.agent.findUnique({ where: { email: data.email } });
    if (existing) {
      throw new AppError('El correo electrónico ya está registrado', 400);
    }

    return await this.agentRepository.create(data);
  }

  async deleteAgent(id: string) {
    const agent = await this.agentRepository.findById(id);
    if (!agent) {
      throw new AppError('Agente no encontrado', 404);
    }

    // Business rule: Do not delete if has active tickets
    // @ts-ignore - access include from repo
    if (agent.tickets && agent.tickets.length > 0) {
      throw new AppError('No se puede eliminar un agente que tiene tickets asignados', 422);
    }

    return await this.agentRepository.delete(id);
  }
}
