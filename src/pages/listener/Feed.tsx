import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthProvider';

const Feed: React.FC = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    // Future refresh logic could be placed here if needed
  }, []);

  if (loading || !user) {
    return <div className="p-6">Loading your personalized feed...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">For You, {user.username}</h1>
      <p className="text-foreground/70">We’re curating something special for you.</p>
      {/* Add actual feed content here */}
    </div>
  );
};

export default Feed;
