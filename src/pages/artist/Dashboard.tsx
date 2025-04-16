import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Upload,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Share2,
  Bell,
  ShoppingBag,
  Heart,
  Play,
  MessageSquare,
  Instagram,
  Youtube,
  Music,
  ChevronRight,
  Headphones,
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { format } from 'date-fns';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthProvider';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Track {
  id: string;
  title: string;
  cover_url: string;
  plays: number;
  created_at: string;
}

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  created_at: string;
}

const ArtistDashboard: React.FC = () => {
  const { user } = useAuth();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPlays: 0,
    followers: 0,
    revenue: 0,
    monthlyListeners: 0,
  });

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Plays',
        data: [1200, 1900, 3000, 5000, 4000, 6000],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: 'rgba(255, 255, 255, 0.7)' },
      },
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: 'rgba(255, 255, 255, 0.7)' },
      },
    },
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data: tracksData } = await supabase
          .from('tracks')
          .select('*')
          .eq('artist_id', user?.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (tracksData) setTracks(tracksData);

        setNotifications([
          {
            id: '1',
            message: 'New follower: John Doe',
            type: 'success',
            created_at: new Date().toISOString(),
          },
          {
            id: '2',
            message: 'Your track "Summer Vibes" reached 1000 plays!',
            type: 'info',
            created_at: new Date().toISOString(),
          },
        ]);

        setStats({ totalPlays: 15000, followers: 1200, revenue: 450, monthlyListeners: 3500 });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchDashboardData();
  }, [user]);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const { data: statsData, error: statsError } = await supabase
          .from('artist_stats')
          .select('*')
          .eq('artist_id', user?.id);

        if (statsError) throw statsError;

        if (statsData?.length) {
          const { totalPlays, followers, revenue, monthlyListeners } = statsData[0];
          setStats({ totalPlays, followers, revenue, monthlyListeners });
        }
      } catch (error) {
        console.error('Error loading artist dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchArtistData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-t-2 border-b-2 rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  return <div className="space-y-8">{/* ... existing JSX ... */}</div>;
};

export default ArtistDashboard;
