import React from "react";
import { Button } from "@/components/ui/button";
import { Bot, ArrowRight, Clock3, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ChatHome() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/chat");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-20">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Background glow orbs */}
      <div className="absolute left-10 top-10 h-96 w-96 animate-pulse rounded-full bg-blue-500/20 blur-[100px]" />
      <div
        className="absolute bottom-10 right-10 h-96 w-96 animate-pulse rounded-full bg-cyan-500/20 blur-[100px]"
        style={{ animationDelay: "1.5s" }}
      />
      <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />

      {/* Fade-in-up animation keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fadeInUp 0.6s ease-out both; }
      `}</style>

      <div className="relative z-10 max-w-4xl text-center">
        {/* Badge */}
        <div
          className="fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 backdrop-blur-sm"
        >
          <Sparkles size={16} className="text-blue-400" />
          AI-Powered Support Assistant
        </div>

        {/* Icon */}
        <div
          className="fade-in-up mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-2xl shadow-blue-500/40 ring-1 ring-white/10"
          style={{ animationDelay: "0.1s" }}
        >
          <Bot size={44} className="text-white" strokeWidth={1.75} />
        </div>

        {/* Heading */}
        <h1
          className="fade-in-up mb-6 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl"
          style={{ animationDelay: "0.15s" }}
        >
          Welcome to
          <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            AI HelpDesk System
          </span>
        </h1>

        {/* Description */}
        <p
          className="fade-in-up mx-auto mb-10 max-w-2xl text-lg leading-8 text-slate-400"
          style={{ animationDelay: "0.2s" }}
        >
          Experience intelligent customer support powered by AI. Get instant
          answers, create and track support tickets, and resolve issues faster
          with a smart assistant available 24/7.
        </p>

        {/* Features */}
        <div
          className="fade-in-up mb-12 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "0.25s" }}
        >
          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-5 py-2.5 text-sm text-slate-300 backdrop-blur-sm transition-colors hover:border-slate-700">
            <Clock3 size={16} className="text-blue-400" />
            24/7 AI Assistance
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-5 py-2.5 text-sm text-slate-300 backdrop-blur-sm transition-colors hover:border-slate-700">
            <ShieldCheck size={16} className="text-green-400" />
            Secure Conversations
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-5 py-2.5 text-sm text-slate-300 backdrop-blur-sm transition-colors hover:border-slate-700">
            <Zap size={16} className="text-cyan-400" />
            Smart Ticket Resolution
          </div>
        </div>

        {/* Buttons */}
        <div
          className="fade-in-up flex flex-col justify-center gap-4 sm:flex-row"
          style={{ animationDelay: "0.3s" }}
        >
          <Button
            size="lg"
            className="group relative overflow-hidden rounded-xl bg-blue-600 px-8 py-6 text-base font-semibold shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/40 cursor-pointer"
            onClick={handleClick}
          >
            <span className="relative z-10 flex items-center">
              Start Getting Help
              <ArrowRight
                size={18}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="rounded-xl border-slate-700 bg-slate-900/40 px-8 py-6 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-slate-600 hover:bg-slate-800"
          >
            Learn More
          </Button>
        </div>

        {/* Stats row */}
        <div
          className="fade-in-up mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-slate-800/80 pt-8"
          style={{ animationDelay: "0.35s" }}
        >
          <div>
            <p className="text-2xl font-bold text-white">98%</p>
            <p className="text-xs text-slate-500">Resolution Rate</p>
          </div>
          <div className="hidden h-8 w-px bg-slate-800 sm:block" />
          <div>
            <p className="text-2xl font-bold text-white">&lt;30s</p>
            <p className="text-xs text-slate-500">Avg. Response Time</p>
          </div>
          <div className="hidden h-8 w-px bg-slate-800 sm:block" />
          <div>
            <p className="text-2xl font-bold text-white">24/7</p>
            <p className="text-xs text-slate-500">Availability</p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="mt-8 text-sm text-slate-600">
          Powered by AI • Fast • Reliable • Always Available
        </p>
      </div>
    </div>
  );
}

export default ChatHome;