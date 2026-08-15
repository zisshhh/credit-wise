"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SendHorizontal } from "lucide-react";

export default function AskBuddy() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/assistant?q=${encodeURIComponent(query.trim())}`);
        } else {
            router.push("/assistant");
        }
    };

    return (
        <div className="w-full bg-black border border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                Still Confused? Ask Buddy 👇
            </h2>

            <div className="flex items-center gap-4">
                <div className="size-10 sm:size-11 rounded-full bg-gradient-to-tr from-pink-500 via-rose-400 to-sky-300 shrink-0 shadow-md" />
                <div className="bg-[#222226] text-zinc-200 px-5 py-3.5 rounded-2xl rounded-tl-xs text-sm sm:text-base leading-relaxed border border-white/5">
                    Hello! I can help you find the perfect credit card. What are you looking for?
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-3">
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask me about credit cards..."
                        className="w-full bg-[#18181c] text-white placeholder-zinc-500 border border-zinc-700/60 rounded-full px-6 py-3.5 text-sm sm:text-base focus:outline-none focus:border-zinc-500 transition-all shadow-inner"/>
                </div>
                <button
                    type="submit"
                    className="size-11 rounded-full bg-white hover:bg-zinc-200 text-black flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-lg active:scale-95"
                    title="Ask Buddy">
                    <SendHorizontal className="size-5 text-black" />
                </button>
            </form>
        </div>
    );
}
