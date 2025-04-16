import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Moon,
  Sun,
  Volume2,
  Shield,
  Globe,
  Palette,
  Sliders,
  Radio,
  Download,
  HardDrive,
  Wifi,
  Headphones,
  Save,
} from 'lucide-react';

const Settings: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [notifications, setNotifications] = useState(true);
  const [audioQuality, setAudioQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [downloadQuality, setDownloadQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [language, setLanguage] = useState('en');
  const [autoplay, setAutoplay] = useState(true);
  const [crossfade, setCrossfade] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [storageUsed] = useState('2.4');
  const [storageLimit] = useState('10');

  const handleSaveSettings = () => {
    // Save settings logic here
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-foreground/70">Customize your music experience</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance */}
        <div className="bg-secondary/50 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Palette className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Appearance</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <span>Theme</span>
              </div>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as 'dark' | 'light')}
                className="bg-secondary/50 border border-white/10 rounded-lg px-3 py-1.5"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5" />
                <span>Language</span>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-secondary/50 border border-white/10 rounded-lg px-3 py-1.5"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </div>

        {/* Audio */}
        <div className="bg-secondary/50 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Volume2 className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Audio</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Radio className="w-5 h-5" />
                <span>Audio Quality</span>
              </div>
              <select
                value={audioQuality}
                onChange={(e) => setAudioQuality(e.target.value as 'high' | 'medium' | 'low')}
                className="bg-secondary/50 border border-white/10 rounded-lg px-3 py-1.5"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5" />
                <span>Download Quality</span>
              </div>
              <select
                value={downloadQuality}
                onChange={(e) => setDownloadQuality(e.target.value as 'high' | 'medium' | 'low')}
                className="bg-secondary/50 border border-white/10 rounded-lg px-3 py-1.5"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sliders className="w-5 h-5" />
                <span>Crossfade</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={crossfade}
                  onChange={(e) => setCrossfade(e.target.checked)}
                />
                <div className="w-11 h-6 bg-secondary/50 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-secondary/50 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5" />
                <span>Push Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
                <div className="w-11 h-6 bg-secondary/50 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Headphones className="w-5 h-5" />
                <span>Autoplay</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={autoplay}
                  onChange={(e) => setAutoplay(e.target.checked)}
                />
                <div className="w-11 h-6 bg-secondary/50 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Storage */}
        <div className="bg-secondary/50 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/20 rounded-lg">
              <HardDrive className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Storage</h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground/70">
                  {storageUsed}GB of {storageLimit}GB used
                </span>
                <span className="text-sm text-foreground/70">
                  {Math.round((parseInt(storageUsed) / parseInt(storageLimit)) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${(parseInt(storageUsed) / parseInt(storageLimit)) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wifi className="w-5 h-5" />
                <span>Offline Mode</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={offlineMode}
                  onChange={(e) => setOfflineMode(e.target.checked)}
                />
                <div className="w-11 h-6 bg-secondary/50 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSaveSettings}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
      >
        <Save className="w-5 h-5" />
        <span>Save Settings</span>
      </motion.button>
    </div>
  );
};

export default Settings;
