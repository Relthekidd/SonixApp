import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  X,
  Music,
  BarChart2,
  HardDrive,
  MessageCircle,
  PlayCircle,
  ShoppingBag,
  Users,
  Megaphone,
  Loader2,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthProvider';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: {
    track_uploads: number | string;
    analytics: string;
    storage: string;
    support: string;
    playlist_placement: boolean;
    merch_slots: number | string;
    fan_insights: boolean;
    promotion_tools: boolean;
  };
}

interface Subscription {
  id: string;
  plan_id: string;
  status: string;
  current_period_end: string;
}

const featureIcons = {
  track_uploads: Music,
  analytics: BarChart2,
  storage: HardDrive,
  support: MessageCircle,
  playlist_placement: PlayCircle,
  merch_slots: ShoppingBag,
  fan_insights: Users,
  promotion_tools: Megaphone,
};

const SubscriptionsPage: React.FC = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    const fetchPlansAndSubscription = async () => {
      try {
        const { data: plansData, error: plansError } = await supabase
          .from('subscription_plans')
          .select('*')
          .order('price');

        if (plansError) throw plansError;
        setPlans(plansData);

        if (user) {
          const { data: subData, error: subError } = await supabase
            .from('user_subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (!subError) {
            setCurrentSubscription(subData);
          }
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlansAndSubscription();
  }, [user]);

  const handleSubscribe = async (planId: string) => {
    if (!user) return;

    setSubscribing(true);
    try {
      console.log('Subscribing to plan:', planId);
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="px-4 py-8 mx-auto space-y-8 max-w-7xl">
      {/* rest of component stays the same */}
    </div>
  );
};

export default SubscriptionsPage;
