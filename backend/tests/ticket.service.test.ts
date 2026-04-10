import { TicketService } from '../src/services/ticket.service';
import { AppError } from '../src/middlewares/errorHandler';
import { Status, Priority } from '@prisma/client';

// Mock the repository
const mockFindById = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();
const mockCreate = jest.fn();

jest.mock('../src/repositories/ticket.repository', () => {
  return {
    TicketRepository: jest.fn().mockImplementation(() => {
      return {
        findById: mockFindById,
        update: mockUpdate,
        delete: mockDelete,
        create: mockCreate,
      };
    }),
  };
});

describe('TicketService', () => {
  let ticketService: TicketService;

  beforeEach(() => {
    ticketService = new TicketService();
    jest.clearAllMocks();
  });

  describe('createTicket', () => {
    it('should throw an error if required fields are missing', async () => {
      const incompleteTicket: any = { title: 'Test' };
      await expect(ticketService.createTicket(incompleteTicket)).rejects.toThrow(
        new AppError('Validation Error: Missing required fields', 400)
      );
    });
  });

  describe('updateTicket', () => {
    it('should throw an error if modifying a resolved ticket', async () => {
      mockFindById.mockResolvedValue({ id: '1', status: Status.RESOLVED });

      await expect(ticketService.updateTicket('1', { title: 'New' })).rejects.toThrow(
        new AppError('Cannot modify a resolved ticket', 422)
      );
    });
    
    it('should update the ticket if it is not resolved', async () => {
        mockFindById.mockResolvedValue({ id: '2', status: Status.OPEN });
        mockUpdate.mockResolvedValue({ id: '2', title: 'New', status: Status.OPEN });
  
        const updated = await ticketService.updateTicket('2', { title: 'New' });
        expect(updated.title).toBe('New');
        expect(mockUpdate).toHaveBeenCalledWith('2', { title: 'New' });
      });
  });

  describe('deleteTicket', () => {
    it('should throw an error if deleting a ticket that is not OPEN', async () => {
      mockFindById.mockResolvedValue({ id: '1', status: Status.IN_PROGRESS });

      await expect(ticketService.deleteTicket('1')).rejects.toThrow(
        new AppError('Cannot delete a ticket that is not OPEN', 422)
      );
    });

    it('should delete the ticket if it is OPEN', async () => {
      mockFindById.mockResolvedValue({ id: '2', status: Status.OPEN });
      mockDelete.mockResolvedValue(true);

      await ticketService.deleteTicket('2');
      expect(mockDelete).toHaveBeenCalledWith('2');
    });
  });
});
