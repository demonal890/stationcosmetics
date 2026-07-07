import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SiteSettings {
  id?: number;
  store_name?: string;
  store_address?: string;
  store_hours?: string;
  whatsapp_number?: string;
  shopee_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
  google_maps_url?: string;
  google_maps_embed?: string;
  promo_bar_text?: string;
  hero_title?: string;
  hero_subtitle?: string;
  meta_title?: string;
  meta_description?: string;
  updated_at?: string;
}

// Get site settings (singleton row)
export async function getSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to fetch settings: ${error.message}`);
  }

  return data || ({} as SiteSettings);
}
