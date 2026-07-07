'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateSiteSettings(formData: {
  store_name?: string;
  store_address?: string;
  store_hours?: string;
  whatsapp_number?: string;
  shopee_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
  google_maps_url?: string;
  promo_bar_text?: string;
  hero_title?: string;
  hero_subtitle?: string;
  meta_title?: string;
  meta_description?: string;
}) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('site_settings')
      .update(formData)
      .eq('id', 1); // Assuming id=1 is the single settings row

    if (error) throw error;

    revalidatePath('/admin/settings');
    revalidatePath('/(site)');
    return { success: true };
  } catch (error) {
    console.error('Update settings failed:', error);
    let message = 'Terjadi kesalahan';
    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === 'object') {
      message = (error as any).message || JSON.stringify(error);
    }
    return { success: false, error: message };
  }
}

export async function getSiteSettings() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Get settings failed:', error);
    return null;
  }
}
