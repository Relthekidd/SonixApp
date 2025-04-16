import { Compass, Sparkles, Book, Heart, Upload, BarChart2, Shield, Settings } from 'lucide-react';

export const navItems = {
  primary: [
    { path: '/explore', icon: Compass, label: 'Explore' },
    { path: '/feed', icon: Sparkles, label: 'For You', role: 'listener' },
    { path: '/library', icon: Book, label: 'Library' },
    { path: '/liked', icon: Heart, label: 'Liked Songs' },
  ],
  artist: [
    { path: '/artist/dashboard', icon: BarChart2, label: 'Dashboard' },
    { path: '/upload', icon: Upload, label: 'Upload' },
  ],
  admin: [{ path: '/admin/dashboard', icon: Shield, label: 'Admin' }],
  secondary: [{ path: '/settings', icon: Settings, label: 'Settings' }],
};
