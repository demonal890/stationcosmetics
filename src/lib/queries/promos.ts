import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Promo {
  id: string;
  title: string;
  description?: string;
  discount_label?: string;
  image_url?: string;
  cta_url?: string;
  start_date?: string;
  end_date?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface Banner {
  id: string;
  title?: string;
  subtitle?: string;
  image_url?: string;
  link_url?: string;
  placement: 'promo_bar' | 'hero' | 'promo_section';
  start_date?: string;
  end_date?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

// Get active promos
export async function getActivePromos() {
  const { data, error } = await supabase
    .from('promos')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to fetch promos: ${error.message}`);
  return data as Promo[];
}

// Get banners by placement
export async function getBannersByPlacement(placement: 'promo_bar' | 'hero' | 'promo_section') {
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .eq('placement', placement)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`Failed to fetch banners: ${error.message}`);
  return data as Banner[];
}
