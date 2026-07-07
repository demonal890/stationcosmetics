'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createPromo(formData: {
  title: string;
  description?: string;
  discount_label: string;
  image_url?: string;
  cta_url?: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('promos')
      .insert([{
        title: formData.title,
        description: formData.description,
        discount_label: formData.discount_label,
        image_url: formData.image_url,
        cta_url: formData.cta_url,
        start_date: formData.start_date,
        end_date: formData.end_date,
        is_active: formData.is_active,
      }])
      .select('id');

    if (error) throw error;

    revalidatePath('/admin/promos');
    revalidatePath('/(site)/promo');
    return { success: true, id: data?.[0]?.id };
  } catch (error) {
    console.error('Create promo failed:', error);
    let message = 'Terjadi kesalahan';
    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === 'object') {
      message = (error as any).message || JSON.stringify(error);
    }
    return { success: false, error: message };
  }
}

export async function updatePromo(
  id: string,
  formData: {
    title: string;
    description?: string;
    discount_label: string;
    image_url?: string;
    cta_url?: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
  }
) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('promos')
      .update({
        title: formData.title,
        description: formData.description,
        discount_label: formData.discount_label,
        image_url: formData.image_url,
        cta_url: formData.cta_url,
        start_date: formData.start_date,
        end_date: formData.end_date,
        is_active: formData.is_active,
      })
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin/promos');
    revalidatePath('/(site)/promo');
    return { success: true };
  } catch (error) {
    console.error('Update promo failed:', error);
    let message = 'Terjadi kesalahan';
    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === 'object') {
      message = (error as any).message || JSON.stringify(error);
    }
    return { success: false, error: message };
  }
}

export async function deletePromo(id: string) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('promos')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin/promos');
    revalidatePath('/(site)/promo');
    return { success: true };
  } catch (error) {
    console.error('Delete promo failed:', error);
    let message = 'Terjadi kesalahan';
    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === 'object') {
      message = (error as any).message || JSON.stringify(error);
    }
    return { success: false, error: message };
  }
}
