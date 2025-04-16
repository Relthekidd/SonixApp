import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth';
import { Music, Headphones } from 'lucide-react';

const RoleSelection: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserRole } = useAuthStore();

  const handleRoleSelection = async (role: 'artist' | 'listener') => {
    await updateUserRole(role);
    navigate(role === 'artist' ? '/artist/dashboard' : '/feed');
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">Choose Your Role</h1>
      <div className="space-y-4">
        <button
          onClick={() => handleRoleSelection('artist')}
          className="w-full p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-4"
        >
          <Music className="w-8 h-8" />
          <div className="text-left">
            <h2 className="text-lg font-semibold">Artist</h2>
            <p className="text-gray-400">Share your music with the world</p>
          </div>
        </button>
        <button
          onClick={() => handleRoleSelection('listener')}
          className="w-full p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-4"
        >
          <Headphones className="w-8 h-8" />
          <div className="text-left">
            <h2 className="text-lg font-semibold">Listener</h2>
            <p className="text-gray-400">Discover and enjoy great music</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
