/*
  # Initial Schema Setup for Sonix

  1. New Tables
    - profiles
      - id (uuid, references auth.users)
      - role (text, either 'artist' or 'listener')
      - username (text)
      - avatar_url (text)
      - created_at (timestamp)
    
    - tracks
      - id (uuid)
      - title (text)
      - artist_id (uuid, references profiles)
      - cover_url (text)
      - audio_url (text)
      - genre (text)
      - plays (int)
      - created_at (timestamp)
    
    - libraries
      - id (uuid)
      - user_id (uuid, references profiles)
      - track_id (uuid, references tracks)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for reading and writing data
*/

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  role TEXT NOT NULL CHECK (role IN ('artist', 'listener')),
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create tracks table
CREATE TABLE tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  artist_id UUID REFERENCES profiles NOT NULL,
  cover_url TEXT,
  audio_url TEXT NOT NULL,
  genre TEXT,
  plays INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create libraries table
CREATE TABLE libraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles NOT NULL,
  track_id UUID REFERENCES tracks NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, track_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE libraries ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Tracks policies
CREATE POLICY "Tracks are viewable by everyone"
  ON tracks FOR SELECT
  USING (true);

CREATE POLICY "Artists can insert own tracks"
  ON tracks FOR INSERT
  WITH CHECK (auth.uid() = artist_id);

CREATE POLICY "Artists can update own tracks"
  ON tracks FOR UPDATE
  USING (auth.uid() = artist_id);

-- Libraries policies
CREATE POLICY "Users can view own library"
  ON libraries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own library"
  ON libraries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from own library"
  ON libraries FOR DELETE
  USING (auth.uid() = user_id);