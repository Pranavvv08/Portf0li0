import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  RotateCcw,
  Bot,
  Zap,
  ChevronRight,
} from "lucide-react";

const STARTER_PROMPTS = [
  { icon: Zap, label: "Tech stack", query: "What are your core technical skills?" },
  { icon: Sparkles, label: "Best project", query: "Tell me about your best project" },
  { icon: Bot, label: "Experience", query: "What is your experience and education?" },
  { icon: Send, label: "Contact", query: "How can I contact you?" },
];

/* ---------- rich text formatting for assistant answers ---------- */
function formatInline(text) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    if (part.startsWith("`") && part.endsWith("`"))
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 mx-0.5 rounded-md font-mono text-[12px] bg-violet-500/15 border border-violet-400/25 text-violet-300"
        >
          {part.slice(1, -1)}
        </code>
      );
    return part;
  });
}

function AssistantText({ content }) {
  const blocks = content.split(/\n\n+/);
  return (
    <div className="space-y-2 text-[13.5px] leading-relaxed text-zinc-300">
      {blocks.map((block, i) => {
        const t = block.trim();
        if (t.startsWith("- ") || t.startsWith("* ")) {
          return (
            <ul key={i} className="space-y-1.5 my-1.5">
              {t.split(/\n(?=[-*]\s)/).map((item, j) => (
                <li key={j} className="flex items-start gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 shadow-[0_0_6px_rgba(167,139,250,0.9)]" />
                  <span>{formatInline(item.replace(/^[-*]\s*/, ""))}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{formatInline(t)}</p>;
      })}
    </div>
  );
}

/* ---------- the widget ---------- */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey there 👋 I'm **Pranav's AI** — trained on his portfolio.\n\nAsk me about his projects, skills, or how to reach him.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = (smooth = true) =>
    endRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 350);
  }, [isOpen]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", content: query }]);
    setInput("");
    setIsTyping(true);

    try {
      const apiUrl = import.meta.env.VITE_RAG_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer || "I don't have that in my knowledge base yet." },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I couldn't reach my AI backend. If you're running locally, make sure the RAG server is live on `http://localhost:8000`.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () =>
    setMessages([
      {
        role: "assistant",
        content: "Fresh start ✨ What else would you like to know about Pranav?",
      },
    ]);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[9999] font-sans">
      {/* ============ LAUNCHER ORB ============ */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="orb"
            initial={{ scale: 0, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 90 }}
            transition={{ type: "spring", damping: 15, stiffness: 260 }}
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="group relative block w-16 h-16 rounded-full cursor-pointer outline-none"
            aria-label="Open chat"
          >
            {/* rotating conic halo */}
            <span
              className="absolute -inset-[3px] rounded-full opacity-90 group-hover:opacity-100 blur-[6px]"
              style={{
                background:
                  "conic-gradient(from 0deg, #7c3aed, #d946ef, #6366f1, #7c3aed)",
                animation: "spin 6s linear infinite",
              }}
            />
            {/* core */}
            <span className="absolute inset-0 rounded-full bg-zinc-950 border border-white/10 flex items-center justify-center overflow-hidden">
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(139,92,246,0.45),transparent_60%)]" />
              <Sparkles className="relative w-6 h-6 text-violet-300 drop-shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
            </span>
            {/* orbiting spark */}
            <span
              className="absolute inset-0"
              style={{ animation: "spin 4s linear infinite" }}
            >
              <span className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_#e879f9]" />
            </span>
            {/* label pill — appears on hover, anchored so it never clips */}
            <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-zinc-950/95 border border-violet-500/40 px-3.5 py-1.5 text-xs font-medium text-violet-200 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              Ask my AI ✦
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ============ CHAT PANEL ============ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.85, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            style={{ transformOrigin: "bottom right" }}
            className="
              fixed bottom-5 right-5 sm:bottom-6 sm:right-6
              w-[calc(100vw-2.5rem)] sm:w-[400px]
              h-[min(600px,calc(100dvh-6.5rem))]
              rounded-3xl overflow-hidden
            "
          >
            {/* animated gradient border */}
            <div
              className="absolute -inset-[2px] rounded-3xl opacity-80 blur-[2px]"
              style={{
                background:
                  "conic-gradient(from var(--angle,0deg), #7c3aed, #d946ef, #4f46e5, #7c3aed)",
                animation: "spin 8s linear infinite",
              }}
            />

            <div className="relative flex flex-col h-full bg-zinc-950/95 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10">
              {/* aurora background blobs */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -left-16 w-56 h-56 rounded-full bg-violet-600/25 blur-3xl" />
                <div className="absolute top-1/3 -right-20 w-64 h-64 rounded-full bg-fuchsia-600/15 blur-3xl" />
                <div className="absolute -bottom-24 left-1/4 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl" />
              </div>

              {/* ---------- HEADER ---------- */}
              <div className="relative px-5 pt-5 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* breathing avatar */}
                    <div className="relative">
                      <motion.div
                        animate={{ boxShadow: [
                          "0 0 0px rgba(139,92,246,0.0)",
                          "0 0 18px rgba(139,92,246,0.6)",
                          "0 0 0px rgba(139,92,246,0.0)",
                        ] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-fuchsia-600 flex items-center justify-center"
                      >
                        <Bot className="w-5.5 h-5.5 w-6 h-6 text-white" />
                      </motion.div>
                      <span className="absolute -bottom-0.5 -right-0.5 flex">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                        <span className="relative inline-flex w-3 h-3 rounded-full bg-emerald-400 border-2 border-zinc-950" />
                      </span>
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-white tracking-tight flex items-center gap-2">
                        Pranav AI
                        <span className="px-1.5 py-px text-[9px] font-mono uppercase tracking-widest rounded bg-violet-500/20 text-violet-300 border border-violet-400/30">
                          RAG
                        </span>
                      </h3>
                      <p className="text-[11px] text-emerald-400/90 font-medium">
                        Online · answers instantly
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <motion.button
                      whileHover={{ rotate: -180 }}
                      transition={{ duration: 0.4 }}
                      onClick={handleReset}
                      title="Clear chat"
                      className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </motion.button>
                    <button
                      onClick={() => setIsOpen(false)}
                      title="Close"
                      className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {/* hairline gradient divider */}
                <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
              </div>

              {/* ---------- MESSAGES ---------- */}
              <div
                data-lenis-prevent
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="relative flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4 [scrollbar-width:thin] [scrollbar-color:rgba(139,92,246,0.4)_transparent]"
              >
                {messages.map((msg, i) => {
                  const isUser = msg.role === "user";
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 320,
                        delay: Math.min(i * 0.03, 0.2),
                      }}
                      className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      {!isUser && (
                        <div className="w-7 h-7 shrink-0 rounded-lg bg-gradient-to-br from-violet-600/40 to-fuchsia-600/40 border border-violet-400/30 flex items-center justify-center mb-0.5">
                          <Sparkles className="w-3.5 h-3.5 text-violet-300" />
                        </div>
                      )}

                      <div
                        className={
                          isUser
                            ? "max-w-[80%] px-4 py-2.5 text-[13.5px] leading-relaxed text-white rounded-[20px] rounded-br-md bg-gradient-to-br from-violet-600 to-indigo-600 shadow-[0_4px_20px_rgba(99,102,241,0.35)]"
                            : "max-w-[85%] px-4 py-3 rounded-[20px] rounded-bl-md bg-white/[0.06] border border-white/10 backdrop-blur-md"
                        }
                      >
                        {isUser ? msg.content : <AssistantText content={msg.content} />}
                      </div>
                    </motion.div>
                  );
                })}

                {/* typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-end gap-2"
                  >
                    <div className="w-7 h-7 shrink-0 rounded-lg bg-gradient-to-br from-violet-600/40 to-fuchsia-600/40 border border-violet-400/30 flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 text-violet-300 animate-pulse" />
                    </div>
                    <div className="px-4 py-3.5 rounded-[20px] rounded-bl-md bg-white/[0.06] border border-white/10 flex items-center gap-1.5">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                          className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                <div ref={endRef} />
              </div>

              {/* ---------- STARTER PILLS ---------- */}
              {messages.length <= 2 && !isTyping && (
                <div className="relative px-4 pb-2 flex flex-wrap gap-1.5">
                  {STARTER_PROMPTS.map((p, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.07 }}
                      onClick={() => handleSend(p.query)}
                      className="group flex items-center gap-1.5 text-[11.5px] font-medium px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-white hover:border-violet-400/50 hover:bg-violet-600/20 transition-all duration-200"
                    >
                      <p.icon className="w-3 h-3 text-violet-400" />
                      {p.label}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* ---------- INPUT ---------- */}
              <div className="relative p-3.5 pt-2">
                <div className="relative flex items-center gap-2 rounded-2xl bg-white/[0.06] border border-white/10 focus-within:border-violet-400/60 focus-within:bg-white/[0.08] focus-within:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] transition-all duration-300">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    disabled={isTyping}
                    placeholder="Ask me anything…"
                    className="flex-1 px-4 py-3 bg-transparent text-[13.5px] text-white placeholder-zinc-500 focus:outline-none disabled:opacity-40"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    className="mr-2 w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white shadow-[0_0_16px_rgba(139,92,246,0.5)] disabled:opacity-25 disabled:shadow-none transition-opacity"
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
                <p className="mt-2 text-center text-[10px] text-zinc-600">
                  Powered by PersonaRAG · answers may be imperfect
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* keyframes for the rotating halos (framer can't spin conic gradients) */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
