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
  X,
  Filter
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
  const [showFilters, setShowFilters] = useState(false);
  
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
    <div className="min-h-screen pt-20 px-4 pb-12 bg-black">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="text-amber-400">{tenant?.name || 'Casino'}</span> Dashboard
          </h1>
          <p className="text-white/40 mt-1">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-sm font-medium text-white/60">Wallet Balance</h3>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-amber-400">${balance.toFixed(2)}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Gamepad2 className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-sm font-medium text-white/60">Total Games</h3>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white">{games.length}</p>
            <p className="text-xs text-white/40 mt-1">{games.filter(g => g.isActive).length} active</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-sm font-medium text-white/60">Game Types</h3>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white">
              {new Set(games.map(g => g.type)).size}
            </p>
            <p className="text-xs text-white/40 mt-1">different categories</p>
          </div>
        </div>

        {/* Game Management Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="p-4 md:p-6 border-b border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg md:text-xl font-bold">Game Management</h2>
              </div>
              <button
                onClick={() => setShowAddGame(true)}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400 transition-colors text-sm md:text-base"
              >
                <Plus className="w-4 h-4" />
                Add New Game
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="p-4 md:p-6 border-b border-white/10">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search games by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:border-amber-500 focus:outline-none text-sm"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-white/10 rounded-lg hover:border-amber-500 transition-colors text-sm"
                >
                  <Filter className="w-4 h-4" />
                  Filter
                  {selectedType && <span className="w-2 h-2 bg-amber-500 rounded-full"></span>}
                </button>
                {showFilters && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl z-10">
                    <div className="p-3">
                      <label className="text-sm font-medium mb-2 block">Game Type</label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-amber-500 focus:outline-none text-sm"
                      >
                        <option value="">All Types</option>
                        {gameTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                      {selectedType && (
                        <button
                          onClick={() => setSelectedType('')}
                          className="mt-2 text-xs text-amber-400 hover:text-amber-300"
                        >
                          Clear filter
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Games Grid */}
          <div className="p-4 md:p-6">
            {filteredGames.length === 0 ? (
              <div className="text-center py-12">
                <Gamepad2 className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/40">No games found</p>
                <button
                  onClick={() => setShowAddGame(true)}
                  className="mt-4 text-amber-400 hover:text-amber-300 text-sm"
                >
                  Add your first game →
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {filteredGames.map(game => (
                    <motion.div
                      key={game._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-black/40 rounded-xl border border-white/10 hover:border-amber-500/30 transition-all overflow-hidden"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-white truncate">{game.name}</h3>
                            <p className="text-xs text-white/40 mt-1">
                              {gameTypes.find(t => t.value === game.type)?.label || game.type}
                            </p>
                          </div>
                          <div className="flex gap-1 ml-2">
                            <button
                              onClick={() => handleToggleGame(game._id)}
                              className={`p-1.5 rounded-lg transition-colors ${
                                game.isActive 
                                  ? 'text-green-400 hover:bg-green-500/20' 
                                  : 'text-red-400 hover:bg-red-500/20'
                              }`}
                              title={game.isActive ? 'Disable' : 'Enable'}
                            >
                              <Power className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteGame(game._id)}
                              className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                              title="Disable Game"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-xs text-white/50 mb-3 line-clamp-2">{game.description || `${game.name} - Exciting ${game.type} game`}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded">
                            {game.provider}
                          </span>
                          <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                            Min: ${game.minBet}
                          </span>
                          <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
                            Max: ${game.maxBet}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs">
                          <span className={`px-2 py-1 rounded ${
                            game.isActive 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {game.isActive ? 'Active' : 'Disabled'}
                          </span>
                          <span className="text-white/40">
                            RTP: {game.settings?.rtp || 96}% • {game.settings?.volatility || 'medium'} vol
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Add New Game</h2>
                <button
                  onClick={() => setShowAddGame(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddGame} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/80">Game Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none text-white"
                    placeholder="e.g., Lucky 7 Slots"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">Game Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none text-white"
                      required
                    >
                      <option value="">Select type</option>
                      {gameTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">Provider</label>
                    <select
                      value={formData.provider}
                      onChange={(e) => setFormData({...formData, provider: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none text-white"
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
                    <label className="block text-sm font-medium mb-2 text-white/80">Minimum Bet ($)</label>
                    <input
                      type="number"
                      value={formData.minBet}
                      onChange={(e) => setFormData({...formData, minBet: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none text-white"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">Maximum Bet ($)</label>
                    <input
                      type="number"
                      value={formData.maxBet}
                      onChange={(e) => setFormData({...formData, maxBet: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none text-white"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white/80">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none text-white"
                    rows={3}
                    placeholder="Describe the game..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">RTP (%)</label>
                    <input
                      type="number"
                      value={formData.rtp}
                      onChange={(e) => setFormData({...formData, rtp: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none text-white"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">Volatility</label>
                    <select
                      value={formData.volatility}
                      onChange={(e) => setFormData({...formData, volatility: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none text-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">Max Win ($)</label>
                    <input
                      type="number"
                      value={formData.maxWin}
                      onChange={(e) => setFormData({...formData, maxWin: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">House Edge (%)</label>
                    <input
                      type="number"
                      value={formData.houseEdge}
                      onChange={(e) => setFormData({...formData, houseEdge: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500 focus:outline-none text-white"
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