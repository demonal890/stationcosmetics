import { Hero } from '@/components/sections/Hero';
import { QuickLinks } from '@/components/sections/QuickLinks';
import { Categories } from '@/components/sections/Categories';
import { Brands } from '@/components/sections/Brands';
import { BestSellers } from '@/components/sections/BestSellers';
import { Promo } from '@/components/sections/Promo';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { StoreLocation } from '@/components/sections/StoreLocation';
import { FAQ } from '@/components/sections/FAQ';

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
