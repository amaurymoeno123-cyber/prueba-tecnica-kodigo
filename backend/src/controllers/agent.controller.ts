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

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const agent = await agentService.createAgent(req.body);
      res.status(201).json(agent);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await agentService.deleteAgent(req.params.id as string);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
