import { AvailableCard } from '@/components/AvailableCard';
import { CardDiv } from '@/components/CardDiv';
import { Hero } from '@/components/Hero';
import { Navbaar } from '@/components/Navbar';
import data from '@/data/cards.json';

export default function Home() {
  return (
    <main className='min-h-screen bg-black text-white'>
      <Navbaar />
      <Hero />
      <AvailableCard limit={8} />
    </main>
  );
}
