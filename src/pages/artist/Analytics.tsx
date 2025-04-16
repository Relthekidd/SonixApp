import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { TrendingUp, Users, Clock, Globe, Music, Radio } from 'lucide-react';

const Analytics: React.FC = () => {
  const playData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Plays',
        data: [1200, 1900, 3000, 5000, 4000, 6000, 7000],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const listenerData = {
    labels: ['USA', 'UK', 'Germany', 'France', 'Canada', 'Australia'],
    datasets: [
      {
        label: 'Listeners by Country',
        data: [12000, 8000, 5000, 4000, 3500, 3000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-foreground/70">Track your music performance and audience engagement</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-secondary/50 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-foreground/70">Total Plays</p>
              <h3 className="text-2xl font-bold mt-1">45.2K</h3>
            </div>
            <div className="p-2 bg-primary/20 rounded-lg">
              <Radio className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span>12% increase</span>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-foreground/70">Unique Listeners</p>
              <h3 className="text-2xl font-bold mt-1">12.8K</h3>
            </div>
            <div className="p-2 bg-primary/20 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span>8% increase</span>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-foreground/70">Avg. Listen Time</p>
              <h3 className="text-2xl font-bold mt-1">2:45</h3>
            </div>
            <div className="p-2 bg-primary/20 rounded-lg">
              <Clock className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span>15% increase</span>
          </div>
        </div>

        <div className="bg-secondary/50 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-foreground/70">Total Tracks</p>
              <h3 className="text-2xl font-bold mt-1">24</h3>
            </div>
            <div className="p-2 bg-primary/20 rounded-lg">
              <Music className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span>2 new</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-secondary/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Plays Over Time</h2>
            <select className="bg-secondary/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <Line data={playData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-secondary/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Listeners by Region</h2>
            <div className="p-2 bg-primary/20 rounded-lg">
              <Globe className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="h-[300px]">
            <Bar data={listenerData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Top Tracks */}
      <div className="bg-secondary/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">Top Performing Tracks</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5">
              <span className="text-2xl font-bold text-foreground/30 w-8">{index + 1}</span>
              <img
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=50&h=50&fit=crop"
                alt="Track cover"
                className="w-12 h-12 rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium">Summer Vibes</h3>
                <p className="text-sm text-foreground/70">Released: 2 months ago</p>
              </div>
              <div className="text-right">
                <div className="font-medium">15.2K</div>
                <div className="text-sm text-foreground/70">plays</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
