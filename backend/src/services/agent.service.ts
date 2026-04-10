import { AgentRepository } from '../repositories/agent.repository';

export class AgentService {
  private agentRepository: AgentRepository;

  constructor() {
    this.agentRepository = new AgentRepository();
  }

  async getAllAgents() {
    return await this.agentRepository.findAll();
  }
}
