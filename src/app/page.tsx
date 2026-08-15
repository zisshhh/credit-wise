import { AvailableCard } from '@/components/AvailableCard';
import { Hero } from '@/components/Hero';
import { Navbaar } from '@/components/Navbar';
import { ChatSection } from '@/components/ChatSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className='min-h-screen bg-black text-white flex flex-col'>
      <Navbaar />
      <Hero />
      <AvailableCard limit={8} />
      <ChatSection />
      <Footer />
    </main>
  );
}