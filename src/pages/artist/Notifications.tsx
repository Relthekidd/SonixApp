import React, { useState } from 'react';
import { Bell, Heart, Users, Music, Star, Settings, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface Notification {
  id: string;
  type: 'like' | 'follow' | 'comment' | 'milestone' | 'system';
  message: string;
  time: string;
  read: boolean;
}

const Notifications: React.FC = () => {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      message: 'John Doe liked your track "Summer Vibes"',
      time: '2 minutes ago',
      read: false,
    },
    {
      id: '2',
      type: 'follow',
      message: 'You have 5 new followers',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'milestone',
      message: 'Congratulations! Your track reached 1000 plays',
      time: '2 hours ago',
      read: true,
    },
    {
      id: '4',
      type: 'system',
      message: 'Your profile has been verified',
      time: '1 day ago',
      read: true,
    },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5" />;
      case 'follow':
        return <Users className="w-5 h-5" />;
      case 'comment':
        return <MessageSquare className="w-5 h-5" />;
      case 'milestone':
        return <Star className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'like':
        return 'text-red-500 bg-red-500/20';
      case 'follow':
        return 'text-blue-500 bg-blue-500/20';
      case 'comment':
        return 'text-green-500 bg-green-500/20';
      case 'milestone':
        return 'text-yellow-500 bg-yellow-500/20';
      default:
        return 'text-primary bg-primary/20';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-foreground/70">Stay updated with your latest activity</p>
        </div>
        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-4 p-4 rounded-xl ${
              notification.read ? 'bg-secondary/30' : 'bg-secondary/50'
            }`}
          >
            <div className={`p-3 rounded-xl ${getIconColor(notification.type)}`}>
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className={notification.read ? 'text-foreground/70' : ''}>
                {notification.message}
              </p>
              <span className="text-sm text-foreground/50">{notification.time}</span>
            </div>
            {!notification.read && <div className="w-2 h-2 rounded-full bg-primary mt-2" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
