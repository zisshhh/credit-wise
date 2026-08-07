import { Navbaar } from '@/components/Navbar';
import { AvailableCard } from '@/components/AvailableCard';

export default function CardsPage() {
  return (
    <main className='min-h-screen bg-black text-white flex flex-col'>
      <Navbaar />
      <div className="pt-8">
        <AvailableCard />
      </div>
    </main>
  );
}
