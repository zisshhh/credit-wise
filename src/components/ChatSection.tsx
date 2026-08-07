"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizontal } from "lucide-react";

interface Message {
    id: string;
    sender: "bot" | "user";
    text: string;
}

const cleanReply = (str: string): string => {
    if (!str) return "";
    return str
        .replace(/^```(html|markdown|json)?\s*/gi, "")
        .replace(/\s*```$/gi, "")
        .replace(/Based on the dataset,?\s*/gi, "")
        .replace(/According to the dataset,?\s*/gi, "")
        .replace(/From the dataset,?\s*/gi, "")
        .replace(/In our dataset,?\s*/gi, "")
        .replace(/\(ID:\s*\d+\)/gi, "")
        .replace(/ID:\s*\d+/gi, "")
        .trim();
};

const formatAiResponse = (resObj: any): string => {
    if (!resObj) return "";
    if (typeof resObj === "string") {
        return cleanReply(resObj);
    }

    if (resObj.type === "cards") {
        let text = cleanReply(resObj.summary || "");
        if (Array.isArray(resObj.results) && resObj.results.length > 0) {
            const cardList = resObj.results
                .map((c: any) => `• **${c.name}** (${c.bank}): ${cleanReply(c.summary || c.perks?.reward_rate || "")}`)
                .join("\n\n");
            if (cardList) text += (text ? "\n\n" : "") + cardList;
        }
        return text;
    }

    if (resObj.type === "comparison") {
        let text = cleanReply(resObj.summary || "");
        if (Array.isArray(resObj.results) && resObj.results.length > 0) {
            const cardList = resObj.results
                .map((c: any) => `• **${c.name}** (${c.bank}) — Annual Fee: ₹${c.fee?.annual ?? "0"} | Reward Rate: ${c.reward_rate || c.perks?.reward_rate || "N/A"}`)
                .join("\n\n");
            if (cardList) text += (text ? "\n\n" : "") + cardList;
        }
        if (Array.isArray(resObj.missing_cards) && resObj.missing_cards.length > 0) {
            text += `\n\n*(Note: Could not find information for ${resObj.missing_cards.join(", ")})*`;
        }
        return text;
    }

    if (resObj.type === "text") {
        return cleanReply(resObj.content || "");
    }

    return cleanReply(JSON.stringify(resObj, null, 2));
};

export const ChatSection = () => {
    const isFirstRender = useRef(true);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            sender: "bot",
            text: "Hello! I can help you find the perfect credit card. What are you looking for?"
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

  useEffect(() => {
   
}, [messages, isTyping]);

    const handleSend = async (textToSend?: string) => {
        const text = textToSend || input;
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            sender: "user",
            text: text.trim()
        };

        setMessages(prev => [...prev, userMsg]);
        if (!textToSend) setInput("");
        setIsTyping(true);

        try {
            const res = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: text.trim() })
            });

            if (!res.ok) throw new Error("API request failed");

            const data = await res.json();
            let botReply = "";

            if (data.success && data.result) {
                botReply = formatAiResponse(data.result);
            }

            if (!botReply) {
                botReply = "I couldn't retrieve recommendations right now. Please rephrase your query or try again.";
            }

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                sender: "bot",
                text: botReply
            }]);
        } catch (error) {
            console.error("AI Assistant Error:", error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                sender: "bot",
                text: "Sorry, I am having trouble connecting right now. Please try again in a moment."
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const renderFormattedText = (text: string) => {
        const lines = text.split("\n");
        return (
            <div className="space-y-1.5 leading-relaxed">
                {lines.map((line, lineIdx) => {
                    const trimmed = line.trim();
                    if (!trimmed) return <div key={lineIdx} className="h-1" />;

                    const parts = line.split(/(\*\*[^*]+\*\*)/g);
                    const lineContent = parts.map((part, pIdx) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                            return (
                                <strong key={pIdx} className="font-semibold text-white">
                                    {part.slice(2, -2)}
                                </strong>
                            );
                        }
                        return part;
                    });

                    if (trimmed.startsWith("• ") || trimmed.startsWith("- ")) {
                        return (
                            <div key={lineIdx} className="flex items-start gap-2 pl-1 my-0.5">
                                <span className="text-zinc-400 select-none">•</span>
                                <div className="flex-1">{lineContent}</div>
                            </div>
                        );
                    }

                    return <p key={lineIdx}>{lineContent}</p>;
                })}
            </div>
        );
    };

    return (
        <section className="w-full relative px-4 bg-black text-white flex flex-col justify-between">
            <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col justify-between">

                <div className="flex flex-col gap-6 overflow-y-auto max-h-[70vh] min-h-87.5 pr-2 pb-24 scrollbar-none">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-start gap-3.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                                }`}
                        >
                            {/* Avatar */}
                            {msg.sender === "bot" ? (
                                <div className="size-10 rounded-full bg-linear-to-tr from-pink-500 via-rose-400 to-sky-400 shrink-0 shadow-lg" />
                            ) : (
                                <div className="size-10 rounded-full bg-linear-to-tr from-amber-500 via-rose-500 to-indigo-600 shrink-0 shadow-lg" />
                            )}

                            {/* Message Bubble */}
                            <div
                                className={`max-w-[85%] rounded-[20px] px-5 py-3.5 text-sm sm:text-base leading-relaxed ${msg.sender === "user"
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "bg-[#222226] text-zinc-100 border border-white/5 shadow-md"
                                    }`}
                            >
                                {msg.sender === "user" ? msg.text : renderFormattedText(msg.text)}
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex items-start gap-3.5">
                            <div className="size-10 rounded-full bg-linear-to-tr from-pink-500 via-rose-400 to-sky-400 shrink-0 shadow-lg animate-pulse" />
                            <div className="bg-[#222226] border border-white/5 text-zinc-400 rounded-[20px] px-5 py-4 text-xs flex items-center gap-1.5">
                                <span className="size-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="size-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="size-2 bg-zinc-400 rounded-full animate-bounce" />
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Sticky Input Bar */}
                <div className="sticky bottom-0 z-30 bg-black/95 backdrop-blur-lg pt-3 pb-6 border-t border-white/10 w-full">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="w-full max-w-4xl mx-auto flex items-center gap-3"
                    >
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me about credit cards..."
                                className="w-full bg-[#18181c] text-white placeholder-zinc-500 border border-white/20 rounded-full px-6 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="size-11 rounded-full bg-white hover:bg-zinc-200 disabled:opacity-40 text-black flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-lg"
                        >
                            <SendHorizontal className="size-5 text-black" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};