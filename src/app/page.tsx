import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/queries/settings';
import { Hero } from '@/components/sections/Hero';
import { QuickLinks } from '@/components/sections/QuickLinks';
import { Categories } from '@/components/sections/Categories';
import { Brands } from '@/components/sections/Brands';
import { BestSellers } from '@/components/sections/BestSellers';
import { Promo } from '@/components/sections/Promo';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { StoreLocation } from '@/components/sections/StoreLocation';
import { FAQ } from '@/components/sections/FAQ';

export const revalidate = 60; // ISR: revalidate every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings.meta_title || 'Station Cosmetics — Toko Kosmetik Terlengkap di Medan',
    description:
      settings.meta_description ||
      'Belanja kosmetik dan skincare original berkualitas di Station Cosmetics. Toko fisik di Medan & online via Shopee.',
    openGraph: {
      title: settings.meta_title,
      description: settings.meta_description,
      type: 'website',
      url: 'https://stationcosmetics.com',
    },
  };
}

export default function Home() {
  return (
    <>
      <Hero />
      <QuickLinks />
      <Categories />
      <Brands />
      <BestSellers />
      <Promo />
      <WhyChooseUs />
      <StoreLocation />
      <FAQ />
    </>
  );
}
