'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createCategory(formData: {
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
}) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('categories')
      .insert([formData])
      .select('id');

    if (error) throw error;

    revalidatePath('/admin/categories');
    revalidatePath('/(site)/products');
    return { success: true, id: data?.[0]?.id };
  } catch (error) {
    console.error('Create category failed:', error);
    let message = 'Terjadi kesalahan';
    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === 'object') {
      message = (error as any).message || JSON.stringify(error);
    }
    return { success: false, error: message };
  }
}

export async function updateCategory(
  id: string,
  formData: {
    name: string;
    slug: string;
    description?: string;
    is_active: boolean;
  }
) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('categories')
      .update(formData)
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin/categories');
    revalidatePath('/(site)/products');
    return { success: true };
  } catch (error) {
    console.error('Update category failed:', error);
    let message = 'Terjadi kesalahan';
    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === 'object') {
      message = (error as any).message || JSON.stringify(error);
    }
    return { success: false, error: message };
  }
}

export async function deleteCategory(id: string) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin/categories');
    revalidatePath('/(site)/products');
    return { success: true };
  } catch (error) {
    console.error('Delete category failed:', error);
    let message = 'Terjadi kesalahan';
    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === 'object') {
      message = (error as any).message || JSON.stringify(error);
    }
    return { success: false, error: message };
  }
}
