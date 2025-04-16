import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Music2,
  TrendingUp,
  DollarSign,
  Globe,
  Settings,
  Flag,
  UserX,
  Award,
  Loader2,
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { supabase } from '../../lib/supabase';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface AdminDashboardProps {}

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const [loading, setLoading] = useState(true);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalTracks: 0,
    totalRevenue: 0,
    topRegions: [] as string[],
  });

  // Mock data for charts
  const userActivityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Active Users',
        data: [1200, 1900, 3000, 5000, 4000, 6000, 7000],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const trackAnalyticsData = {
    labels: ['Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical'],
    datasets: [
      {
        label: 'Plays by Genre',
        data: [12000, 8000, 15000, 10000, 3000, 2000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: flagsData, error: flagsError } = await supabase
          .from('feature_flags')
          .select('*')
          .order('name');

        if (flagsError) {
          console.error('Error fetching feature flags:', flagsError.message);
          throw flagsError;
        }
        setFeatureFlags(flagsData);

        setStats({
          totalUsers: 15000,
          activeUsers: 8500,
          totalTracks: 25000,
          totalRevenue: 45000,
          topRegions: ['United States', 'United Kingdom', 'Germany', 'Japan', 'Brazil'],
        });
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleFeatureFlag = async (flagId: string, enabled: boolean) => {
    try {
      const { error } = await supabase.from('feature_flags').update({ enabled }).eq('id', flagId);

      if (error) throw error;

      setFeatureFlags((flags) =>
        flags.map((flag) => (flag.id === flagId ? { ...flag, enabled } : flag))
      );
    } catch (error) {
      console.error('Error updating feature flag:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-foreground/70">Manage your platform and monitor analytics</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary/50 rounded-xl p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-foreground/70">Total Users</p>
              <h3 className="text-2xl font-bold mt-1">{stats.totalUsers.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-primary/20 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span>12% increase</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-secondary/50 rounded-xl p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-foreground/70">Active Users</p>
              <h3 className="text-2xl font-bold mt-1">{stats.activeUsers.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-primary/20 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span>8% increase</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-secondary/50 rounded-xl p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-foreground/70">Total Tracks</p>
              <h3 className="text-2xl font-bold mt-1">{stats.totalTracks.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-primary/20 rounded-lg">
              <Music2 className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span>15% increase</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-secondary/50 rounded-xl p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-foreground/70">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1">${stats.totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-primary/20 rounded-lg">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span>20% increase</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Activity Chart */}
        <div className="bg-secondary/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">User Activity</h2>
            <select className="bg-secondary/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <Line data={userActivityData} options={chartOptions} />
          </div>
        </div>

        {/* Track Analytics */}
        <div className="bg-secondary/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Track Analytics</h2>
            <select className="bg-secondary/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm">
              <option>By Genre</option>
              <option>By Region</option>
              <option>By Time</option>
            </select>
          </div>
          <div className="h-[300px]">
            <Bar data={trackAnalyticsData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Feature Flags */}
      <div className="bg-secondary/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">Feature Management</h2>
        <div className="space-y-4">
          {featureFlags.map((flag) => (
            <div
              key={flag.id}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/30"
            >
              <div className="flex items-center gap-3">
                <Flag className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-medium">{flag.name}</h3>
                  <p className="text-sm text-foreground/70">{flag.description}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={flag.enabled}
                  onChange={(e) => toggleFeatureFlag(flag.id, e.target.checked)}
                />
                <div className="w-11 h-6 bg-secondary/50 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
          <UserX className="w-5 h-5 text-red-500" />
          <span>Manage User Reports</span>
        </button>
        <button className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
          <Award className="w-5 h-5 text-yellow-500" />
          <span>Promote Artists</span>
        </button>
        <button className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
          <Settings className="w-5 h-5 text-blue-500" />
          <span>System Settings</span>
        </button>
      </div>

      {/* Top Regions */}
      <div className="bg-secondary/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">Top Regions</h2>
        <div className="space-y-4">
          {stats.topRegions.map((region, index) => (
            <div
              key={region}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/30"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                <span>{region}</span>
              </div>
              <span className="text-foreground/70">{20 - index * 3}% of users</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
