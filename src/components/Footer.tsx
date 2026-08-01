import Link from "next/link";
import { CreditCard } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="w-full border-t border-white/10 bg-black text-white py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link href="/" className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-white/10 text-white">
                        <CreditCard className="size-4" />
                    </span>
                    <span className="text-xl font-bold tracking-tight text-white">
                        Cardly
                    </span>
                </Link>

                <div className="flex items-center gap-6 text-sm text-zinc-400">
                    <Link
                        href="https://x.com/zishanmira"
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-white">
                        Twitter
                    </Link>
                    <Link
                        href="https://github.com/zisshhh"
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-white">
                        Github
                    </Link>
                </div>
            </div>
        </footer>
    );
};
