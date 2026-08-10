import { Navbaar } from '@/components/Navbar';
import { ChatSection } from '@/components/ChatSection';

export default function AssistantPage() {
  return (
    <main className='min-h-screen bg-black text-white flex flex-col justify-between relative'>
      <Navbaar />
      <div className="flex-1 flex flex-col justify-between py-4">
        <ChatSection />
      </div>
    </main>
  );
}
