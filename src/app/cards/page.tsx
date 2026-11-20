import { Navbaar } from '@/components/Navbar';
import { AvailableCard } from '@/components/AvailableCard';
import { Footer } from '@/components/Footer';

export default function CardsPage() {
  return (
    <main className='min-h-screen bg-black text-white flex flex-col justify-between'>
      <Navbaar />
      <div className="flex-1 pt-4">
        <AvailableCard />
      </div>
      <Footer />
    </main>
  );
}
