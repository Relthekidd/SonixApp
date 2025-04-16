import React, { useState } from 'react';
import { Upload as UploadIcon, Music, Image } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthProvider';

const Upload: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const genre = formData.get('genre') as string;
    const audioFile = formData.get('audio') as File;
    const coverFile = formData.get('cover') as File;

    try {
      // Upload files and create track record logic will be implemented
      console.log('Uploading:', { title, genre, audioFile, coverFile });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Upload Track</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block mb-1 text-sm font-medium">
                Track Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg bg-secondary/50 border-secondary"
                placeholder="Enter track title"
              />
            </div>

            <div>
              <label htmlFor="genre" className="block mb-1 text-sm font-medium">
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                required
                className="w-full px-3 py-2 border rounded-lg bg-secondary/50 border-secondary"
              >
                <option value="">Select genre</option>
                <option value="electronic">Electronic</option>
                <option value="rock">Rock</option>
                <option value="hiphop">Hip Hop</option>
                <option value="jazz">Jazz</option>
                <option value="classical">Classical</option>
                <option value="pop">Pop</option>
              </select>
            </div>

            <div>
              <label htmlFor="mood" className="block mb-1 text-sm font-medium">
                Mood
              </label>
              <select
                id="mood"
                name="mood"
                className="w-full px-3 py-2 border rounded-lg bg-secondary/50 border-secondary"
              >
                <option value="">Select mood</option>
                <option value="energetic">Energetic</option>
                <option value="relaxed">Relaxed</option>
                <option value="happy">Happy</option>
                <option value="melancholic">Melancholic</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-4 text-sm font-medium">Audio File</label>
              <div className="p-6 text-center border-2 border-dashed rounded-lg border-secondary">
                <input
                  type="file"
                  name="audio"
                  accept="audio/*"
                  required
                  className="hidden"
                  id="audio-upload"
                />
                <label htmlFor="audio-upload" className="flex flex-col items-center cursor-pointer">
                  <Music className="w-12 h-12 mb-2 text-foreground/50" />
                  <span className="text-sm text-foreground/70">Click to upload audio file</span>
                  <span className="mt-1 text-xs text-foreground/50">MP3, WAV up to 50MB</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-4 text-sm font-medium">Cover Art</label>
              <div className="p-6 text-center border-2 border-dashed rounded-lg border-secondary">
                <input
                  type="file"
                  name="cover"
                  accept="image/*"
                  className="hidden"
                  id="cover-upload"
                />
                <label htmlFor="cover-upload" className="flex flex-col items-center cursor-pointer">
                  <Image className="w-12 h-12 mb-2 text-foreground/50" />
                  <span className="text-sm text-foreground/70">Click to upload cover art</span>
                  <span className="mt-1 text-xs text-foreground/50">JPG, PNG up to 5MB</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {error && <div className="text-sm text-red-500">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium border border-transparent rounded-lg shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          <UploadIcon className="w-5 h-5" />
          {loading ? 'Uploading...' : 'Upload Track'}
        </button>
      </form>
    </div>
  );
};

export default Upload;
