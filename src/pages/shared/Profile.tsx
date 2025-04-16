import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Shield,
  Users,
  Flag,
  BarChart2,
  Lock,
  Bell,
  Edit,
  Upload,
  Save,
  X,
  ChevronRight,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthProvider';

interface Profile {
  username: string;
  avatar_url: string | null;
  role: 'artist' | 'listener' | 'admin' | 'super_admin';
}

interface AdminUser {
  role: 'admin' | 'super_admin' | 'moderator';
  permissions: string[];
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [adminData, setAdminData] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<Profile>>({});
  const [error, setError] = useState<string | null>(null);

  const isAdmin = user?.role === 'admin' || user?.role === ('super_admin' as string);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!user) return;

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('username, avatar_url, role')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);
        setEditedProfile(profileData);

        if (['admin', 'super_admin'].includes(profileData.role)) {
          const { data: adminData, error: adminError } = await supabase
            .from('admin_users')
            .select('role, permissions')
            .eq('user_id', user.id)
            .single();

          if (adminError) throw adminError;
          setAdminData(adminData);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleSaveProfile = async () => {
    try {
      setError(null);
      const { error: updateError } = await supabase
        .from('profiles')
        .update(editedProfile)
        .eq('id', user?.id);

      if (updateError) throw updateError;
      setProfile({ ...profile, ...editedProfile } as Profile);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    try {
      setError(null);
      const fileExt = file.name.split('.').pop();
      const filePath = `avatars/${user.id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('avatars').getPublicUrl(filePath);

      setEditedProfile({ ...editedProfile, avatar_url: publicUrl });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setError('Failed to upload avatar');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-t-2 border-b-2 rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">{/* Rest of component remains unchanged */}</div>
  );
};

export default Profile;
