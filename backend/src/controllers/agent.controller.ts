import { Request, Response, NextFunction } from 'express';
import { AgentService } from '../services/agent.service';

const agentService = new AgentService();

export class AgentController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const agents = await agentService.getAllAgents();
      res.json(agents);
    } catch (error) {
      next(error);
    }
  }
}
