import React from 'react';
import { useParams } from 'react-router-dom';
import { Play, Heart } from 'lucide-react';

const TrackDetail: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex gap-8">
        <div className="w-64 h-64 relative group">
          <img
            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop"
            alt="Track cover"
            className="w-full h-full object-cover rounded-lg"
          />
          <button className="absolute bottom-4 right-4 bg-primary rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2 transition-all duration-300">
            <Play className="w-6 h-6 fill-primary-foreground" />
          </button>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-4xl font-bold">Track Title</h1>
            <p className="text-lg text-foreground/70">Artist Name</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors">
              Play Now
            </button>
            <button className="text-foreground/70 hover:text-primary transition-colors">
              <Heart className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackDetail;
