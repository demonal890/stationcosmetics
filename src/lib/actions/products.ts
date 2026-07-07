'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: {
  name: string;
  slug: string;
  brand: string;
  category_id: string;
  price: number;
  original_price?: number;
  discount?: number;
  description?: string;
  how_to_use?: string;
  rating: number;
  count: number;
  is_best_seller: boolean;
  is_active: boolean;
  image_url?: string;
  shopee_url?: string;
}) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('products')
      .insert([formData])
      .select('id');

    if (error) throw error;

    revalidatePath('/admin/products');
    revalidatePath('/(site)/products');
    return { success: true, id: data?.[0]?.id };
  } catch (error) {
    console.error('Create product failed:', error);
    let message = 'Terjadi kesalahan';
    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === 'object') {
      message = (error as any).message || JSON.stringify(error);
    }
    return { success: false, error: message };
  }
}

export async function updateProduct(
  id: string,
  formData: {
    name: string;
    slug: string;
    brand: string;
    category_id: string;
    price: number;
    original_price?: number;
    discount?: number;
    description?: string;
    how_to_use?: string;
    rating: number;
    count: number;
    is_best_seller: boolean;
    is_active: boolean;
    image_url?: string;
    shopee_url?: string;
  }
) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('products')
      .update(formData)
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin/products');
    revalidatePath('/(site)/products');
    revalidatePath(`/(site)/products/${formData.slug}`);
    return { success: true };
  } catch (error) {
    console.error('Update product failed:', error);
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
    return { success: false, error: message };
  }
}

export async function deleteProduct(id: string) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin/products');
    revalidatePath('/(site)/products');
    return { success: true };
  } catch (error) {
    console.error('Delete product failed:', error);
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
    return { success: false, error: message };
  }
}
