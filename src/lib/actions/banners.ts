'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createBanner(formData: {
  title: string;
  subtitle?: string;
  placement: string;
  image_url?: string;
  link_url?: string;
  start_date?: string;
  end_date?: string;
  sort_order?: number;
  is_active: boolean;
}) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('banners')
      .insert([{
        title: formData.title,
        subtitle: formData.subtitle,
        placement: formData.placement,
        image_url: formData.image_url,
        link_url: formData.link_url,
        start_date: formData.start_date,
        end_date: formData.end_date,
        sort_order: formData.sort_order || 0,
        is_active: formData.is_active,
      }])
      .select('id');

    if (error) throw error;

    revalidatePath('/admin/banners');
    revalidatePath('/(site)');
    return { success: true, id: data?.[0]?.id };
  } catch (error) {
    console.error('Create banner failed:', error);
    let message = 'Terjadi kesalahan';
    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === 'object') {
      message = (error as any).message || JSON.stringify(error);
    }
    return { success: false, error: message };
  }
}

export async function updateBanner(
  id: string,
  formData: {
    title: string;
    subtitle?: string;
    placement: string;
    image_url?: string;
    link_url?: string;
    start_date?: string;
    end_date?: string;
    sort_order?: number;
    is_active: boolean;
  }
) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('banners')
      .update({
        title: formData.title,
        subtitle: formData.subtitle,
        placement: formData.placement,
        image_url: formData.image_url,
        link_url: formData.link_url,
        start_date: formData.start_date,
        end_date: formData.end_date,
        sort_order: formData.sort_order || 0,
        is_active: formData.is_active,
      })
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin/banners');
    revalidatePath('/(site)');
    return { success: true };
  } catch (error) {
    console.error('Update banner failed:', error);
    let message = 'Terjadi kesalahan';
    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === 'object') {
      message = (error as any).message || JSON.stringify(error);
    }
    return { success: false, error: message };
  }
}

export async function deleteBanner(id: string) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('banners')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin/banners');
    revalidatePath('/(site)');
    return { success: true };
  } catch (error) {
    console.error('Delete banner failed:', error);
    let message = 'Terjadi kesalahan';
    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === 'object') {
      message = (error as any).message || JSON.stringify(error);
    }
    return { success: false, error: message };
  }
}
