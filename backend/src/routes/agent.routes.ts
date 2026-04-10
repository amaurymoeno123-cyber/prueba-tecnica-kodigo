import { Router } from 'express';
import { AgentController } from '../controllers/agent.controller';

const router = Router();
const agentController = new AgentController();

router.get('/', agentController.getAll.bind(agentController));
router.post('/', agentController.create.bind(agentController));
router.delete('/:id', agentController.delete.bind(agentController));

export default router;
