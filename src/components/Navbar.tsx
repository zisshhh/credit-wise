"use client"

import Link from "next/link"
import { CreditCard } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export const Navbaar = () => {
    const router = useRouter()

    return (
        <header className="sticky mx-auto top-0 border-b border-white/10 bg-black/80 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-1">
                    <span className="flex size-8 items-center justify-center rounded-lg text-white">
                        <CreditCard className="size-4" />
                    </span>
                    <span className="text-2xl font-bold tracking-tight text-white">
                        Cardly
                    </span>
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
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

                <Button onClick={() => router.push("/assistant")}
                    className="hidden md:flex px-5">
                    AI assistant
                </Button>
            </div>
        </header>
    )
}