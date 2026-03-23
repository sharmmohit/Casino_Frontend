import api from './api';

export interface WalletData {
  _id: string;
  balance: number;
  currency: string;
  userId: string;
  tenantId: string;
}

export interface Transaction {
  _id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win';
  status: 'pending' | 'completed' | 'failed';
  description: string;
  createdAt: string;
}

export const walletService = {
  // Get wallet balance
  getBalance: async (): Promise<WalletData> => {
    const response = await api.get('/wallet/balance');
    return response.data;
  },

  // Get transaction history
  getTransactions: async (limit = 50): Promise<Transaction[]> => {
    const response = await api.get(`/wallet/transactions?limit=${limit}`);
    return response.data;
  },

  // Deposit funds
  deposit: async (amount: number, method: string): Promise<Transaction> => {
    const response = await api.post('/wallet/deposit', { amount, method });
    return response.data;
  },

  // Withdraw funds
  withdraw: async (amount: number, method: string): Promise<Transaction> => {
    const response = await api.post('/wallet/withdraw', { amount, method });
    return response.data;
  },

  // Place bet (this would typically be in a game service)
  placeBet: async (gameId: string, amount: number): Promise<Transaction> => {
    const response = await api.post('/wallet/bet', { gameId, amount });
    return response.data;
  },
};