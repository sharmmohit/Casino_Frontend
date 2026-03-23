"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { 
  LayoutDashboard, 
  Wallet, 
  Gamepad2, 
  Users, 
  Settings,
  TrendingUp,
  DollarSign,
  Activity,
  Plus,
  Edit,
  Trash2,
  Power,
  Search,
  X
} from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Tenant {
  _id: string;
  name: string;
  domain: string;
}

interface Game {
  _id: string;
  name: string;
  type: string;
  provider: string;
  imageUrl: string;
  minBet: number;
  maxBet: number;
  isActive: boolean;
  isFeatured: boolean;
  description: string;
  settings: {
    rtp: number;
    volatility: string;
    maxWin: number;
    houseEdge: number;
  };
}

const gameTypes = [
  { value: "slots", label: "🎰 Slots", color: "purple" },
  { value: "roulette", label: "🎲 Roulette", color: "red" },
  { value: "blackjack", label: "🃏 Blackjack", color: "green" },
  { value: "poker", label: "♠️ Poker", color: "blue" },
  { value: "baccarat", label: "🎴 Baccarat", color: "gold" },
  { value: "craps", label: "🎲 Craps", color: "orange" },
  { value: "keno", label: "🔢 Keno", color: "pink" },
  { value: "bingo", label: "🎯 Bingo", color: "cyan" },
  { value: "sportsbook", label: "⚽ Sportsbook", color: "indigo" }
];

const providers = [
  { value: "evolution", label: "Evolution Gaming" },
  { value: "pragmatic", label: "Pragmatic Play" },
  { value: "netent", label: "NetEnt" },
  { value: "microgaming", label: "Microgaming" },
  { value: "playtech", label: "Playtech" },
  { value: "custom", label: "Custom Game" }
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [balance, setBalance] = useState(0);
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [activeTab, setActiveTab] = useState('games');
  const [loading, setLoading] = useState(true);
  const [showAddGame, setShowAddGame] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  
  // Form state for adding/editing game
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    provider: '',
    minBet: 1,
    maxBet: 1000,
    description: '',
    rtp: 96,
    volatility: 'medium',
    maxWin: 10000,
    houseEdge: 4
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedTenant = localStorage.getItem('selectedTenant');
    
    if (!token) {
      router.push('/login');
      return;
    }
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTenant) setTenant(JSON.parse(savedTenant));
    
    fetchData();
  }, [router]);

  useEffect(() => {
    // Filter games based on search and type
    let filtered = games;
    if (searchTerm) {
      filtered = filtered.filter(game => 
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedType) {
      filtered = filtered.filter(game => game.type === selectedType);
    }
    setFilteredGames(filtered);
  }, [searchTerm, selectedType, games]);

  const fetchData = async () => {
    try {
      const [balanceRes, gamesRes] = await Promise.all([
        api.get('/wallet/balance'),
        api.get('/games')
      ]);
      setBalance(balanceRes.data.balance);
      setGames(gamesRes.data);
      setFilteredGames(gamesRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/games', {
        name: formData.name,
        type: formData.type,
        provider: formData.provider,
        minBet: formData.minBet,
        maxBet: formData.maxBet,
        description: formData.description,
        settings: {
          rtp: formData.rtp,
          volatility: formData.volatility,
          maxWin: formData.maxWin,
          houseEdge: formData.houseEdge
        }
      });
      
      setShowAddGame(false);
      setFormData({
        name: '', type: '', provider: '', minBet: 1, maxBet: 1000,
        description: '', rtp: 96, volatility: 'medium', maxWin: 10000, houseEdge: 4
      });
      fetchData();
      alert('Game added successfully!');
    } catch (error) {
      alert('Failed to add game');
    }
  };

  const handleToggleGame = async (gameId: string) => {
    try {
      await api.patch(`/games/${gameId}/toggle`);
      fetchData();
    } catch (error) {
      alert('Failed to toggle game');
    }
  };

  const handleDeleteGame = async (gameId: string) => {
    if (confirm('Are you sure you want to disable this game?')) {
      try {
        await api.delete(`/games/${gameId}`);
        fetchData();
        alert('Game disabled successfully');
      } catch (error) {
        alert('Failed to disable game');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-amber-400">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 bg-black">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-amber-400">{tenant?.name}</span> Dashboard
          </h1>
          <p className="text-white/40">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-amber-400" />
              <h3 className="text-lg font-semibold">Wallet Balance</h3>
            </div>
            <p className="text-3xl font-bold text-amber-400">${balance.toFixed(2)}</p>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Gamepad2 className="w-6 h-6 text-amber-400" />
              <h3 className="text-lg font-semibold">Total Games</h3>
            </div>
            <p className="text-3xl font-bold text-white">{games.length}</p>
            <p className="text-sm text-white/40">
              {games.filter(g => g.isActive).length} active
            </p>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-amber-400" />
              <h3 className="text-lg font-semibold">Game Types</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {new Set(games.map(g => g.type)).size}
            </p>
            <p className="text-sm text-white/40">different categories</p>
          </div>
        </div>

        {/* Game Management Section */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          {/* Header with Add Button */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-amber-400" />
              Game Management
            </h2>
            <button
              onClick={() => setShowAddGame(true)}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Game
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-amber-500 focus:outline-none"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-amber-500 focus:outline-none"
            >
              <option value="">All Types</option>
              {gameTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredGames.map(game => (
                <motion.div
                  key={game._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{game.name}</h3>
                        <p className="text-sm text-white/40">
                          {gameTypes.find(t => t.value === game.type)?.label || game.type}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleGame(game._id)}
                          className={`p-1 rounded ${
                            game.isActive ? 'text-green-400' : 'text-red-400'
                          } hover:bg-white/10`}
                        >
                          <Power className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteGame(game._id)}
                          className="p-1 text-red-400 hover:bg-white/10 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-white/60 mb-3">{game.description}</p>
                    
                    <div className="flex flex-wrap gap-2 text-xs mb-3">
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded">
                        {game.provider}
                      </span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                        Min: ${game.minBet}
                      </span>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
                        Max: ${game.maxBet}
                      </span>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">
                        RTP: {game.settings?.rtp || 96}%
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className={`px-2 py-1 rounded ${
                        game.isActive 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {game.isActive ? 'Active' : 'Disabled'}
                      </span>
                      <span className="text-white/40">
                        {game.settings?.volatility || 'medium'} volatility
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredGames.length === 0 && (
            <div className="text-center py-12">
              <Gamepad2 className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/40">No games found</p>
              <button
                onClick={() => setShowAddGame(true)}
                className="mt-4 text-amber-400 hover:text-amber-300"
              >
                Add your first game →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Game Modal */}
      <AnimatePresence>
        {showAddGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddGame(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Add New Game</h2>
                <button
                  onClick={() => setShowAddGame(false)}
                  className="p-2 hover:bg-white/10 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddGame} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Game Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Game Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none"
                      required
                    >
                      <option value="">Select type</option>
                      {gameTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Provider</label>
                    <select
                      value={formData.provider}
                      onChange={(e) => setFormData({...formData, provider: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none"
                      required
                    >
                      <option value="">Select provider</option>
                      {providers.map(provider => (
                        <option key={provider.value} value={provider.value}>{provider.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Minimum Bet ($)</label>
                    <input
                      type="number"
                      value={formData.minBet}
                      onChange={(e) => setFormData({...formData, minBet: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Maximum Bet ($)</label>
                    <input
                      type="number"
                      value={formData.maxBet}
                      onChange={(e) => setFormData({...formData, maxBet: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">RTP (%)</label>
                    <input
                      type="number"
                      value={formData.rtp}
                      onChange={(e) => setFormData({...formData, rtp: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Volatility</label>
                    <select
                      value={formData.volatility}
                      onChange={(e) => setFormData({...formData, volatility: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Win ($)</label>
                    <input
                      type="number"
                      value={formData.maxWin}
                      onChange={(e) => setFormData({...formData, maxWin: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">House Edge (%)</label>
                    <input
                      type="number"
                      value={formData.houseEdge}
                      onChange={(e) => setFormData({...formData, houseEdge: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400 transition-colors"
                  >
                    Create Game
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddGame(false)}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}