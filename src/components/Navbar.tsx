"use client"

import Link from "next/link"
import { CreditCard } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export const Navbaar = () => {
    const router = useRouter()

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-1 shrink-0">
                    <span className="flex size-8 items-center justify-center rounded-lg text-white">
                        <CreditCard className="size-4" />
                    </span>
                    <span className="text-2xl font-bold  text-white">
                        Cardly
                    </span>
                </Link>

                <nav className="hidden items-center gap-4 sm:gap-6 lg:gap-8 md:flex">
                    <Link href="/" className="text-base text-white transition-colors hover:text-blue-400">
                        Home
                    </Link>
                    <Link href="/cards" className="text-sm text-white transition-colors hover:text-blue-400">
                        All cards
                    </Link>
                    <Link href="/assistant" className="text-sm text-white transition-colors hover:text-blue-400">
                        AI assistant
                    </Link>
                    <Link href="/learn" className="text-sm text-white transition-colors hover:text-blue-400">
                        Credit School
                    </Link>
                </nav>

                <div className="space-x-4">
                    <Link href='/assistant'>
                        <Button className="w-full px-6 py-4.5 rounded-md border border-gray-600/50 text-white font-semibold hover:bg-black/95 transition-colors">AI Assistant</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}