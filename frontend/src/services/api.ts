import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

// Interceptor to handle errors centrally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can dispatch a global error event here if using context
    if (error.response) {
      console.error(`API Error [${error.response.status}]:`, error.response.data.message);
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const ticketService = {
  getDashboardCounters: () => api.get('/tickets/dashboard'),
  getAllTickets: () => api.get('/tickets'),
  getTicketById: (id: string) => api.get(`/tickets/${id}`),
  createTicket: (data: any) => api.post('/tickets', data),
  updateTicket: (id: string, data: any) => api.put(`/tickets/${id}`, data),
  deleteTicket: (id: string) => api.delete(`/tickets/${id}`),
};

export const agentService = {
  getAllAgents: () => api.get('/agents'),
};

export default api;
