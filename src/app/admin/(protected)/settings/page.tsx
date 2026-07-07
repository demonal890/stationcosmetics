import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { SettingsForm } from '@/components/admin/SettingsForm';

async function SettingsContent() {
  const supabase = await createClient();

  let settings: any = null;
  let error: string | null = null;

  try {
    const { data, error: fetchError } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (fetchError) throw fetchError;
    settings = data;
  } catch (err) {
    error = 'Gagal mengambil data pengaturan';
    console.error(err);
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600">Pengaturan tidak ditemukan.</p>
      </div>
    );
  }

  return <SettingsForm initialData={settings} />;
}

function SettingsSkeleton() {
  return (
    <div className="space-y-6 max-w-2xl">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg p-6 shadow">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-48 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-2 mt-4"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">Pengaturan Situs</h1>
        <p className="text-gray-600 mt-2">Atur informasi toko dan tautan sosial media</p>
      </div>

      <Suspense fallback={<SettingsSkeleton />}>
        <SettingsContent />
      </Suspense>
    </div>
  );
}
