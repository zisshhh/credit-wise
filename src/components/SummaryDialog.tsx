import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface SummaryModelProps {
    cardName: string
    summary: string
}

export const Summary = ({cardName, summary}: SummaryModelProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className="mt-auto w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                    Summary
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl border-white/10 bg-zinc-950 text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {cardName} Summary
                    </DialogTitle>
                </DialogHeader>

                <p className="mt-2 text-base leading-7 text-zinc-300">
                    {summary}
                </p>
            </DialogContent>
        </Dialog>
    )
}