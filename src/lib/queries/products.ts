import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  brand?: string;
  description?: string;
  how_to_use?: string;
  price?: number;
  original_price?: number;
  discount?: number;
  image_url?: string;
  shopee_url?: string;
  rating: number;
  count: number;
  is_best_seller: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

// Get all products (public)
export async function getProducts(limit?: number) {
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw new Error(`Failed to fetch products: ${error.message}`);
  return data as Product[];
}

// Get products by category
export async function getProductsByCategory(categorySlug: string) {
  const { data: category, error: catError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single();

  if (catError) throw new Error(`Category not found: ${catError.message}`);

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', category.id)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to fetch products: ${error.message}`);
  return data as Product[];
}

// Get single product by slug
export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) throw new Error(`Product not found: ${error.message}`);
  return data as Product;
}

// Get best seller products
export async function getBestSellers(limit: number = 6) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('is_best_seller', true)
    .order('sort_order', { ascending: true })
    .order('count', { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Failed to fetch best sellers: ${error.message}`);
  return data as Product[];
}

// Get discounted products
export async function getDiscountedProducts(limit: number = 8) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .gt('discount', 0)
    .order('discount', { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Failed to fetch discounted products: ${error.message}`);
  return data as Product[];
}

// Get all categories
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`Failed to fetch categories: ${error.message}`);
  return data as Category[];
}

// Get all product slugs (for generateStaticParams)
export async function getAllProductSlugs() {
  const { data, error } = await supabase
    .from('products')
    .select('slug')
    .eq('is_active', true);

  if (error) throw new Error(`Failed to fetch product slugs: ${error.message}`);
  return data.map((p) => p.slug);
}
