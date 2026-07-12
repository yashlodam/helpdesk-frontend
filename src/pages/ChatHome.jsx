import React from "react";
import { Button } from "@/components/ui/button";
import { Bot, ArrowRight, Clock3, ShieldCheck, Sparkles } from "lucide-react";

function ChatHome() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6">

      {/* Background Blur */}
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative z-10 max-w-4xl text-center">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
          <Sparkles size={16} />
          AI Powered Support Assistant
        </div>

        {/* Icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-600 shadow-2xl shadow-blue-500/30">
          <Bot size={46} className="text-white" />
        </div>

        {/* Heading */}
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
          Welcome to
          <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            AI HelpDesk System
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-slate-300">
          Experience intelligent customer support powered by AI. Get instant
          answers, create and track support tickets, and resolve issues faster
          with a smart assistant available 24/7.
        </p>

        {/* Features */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">

          <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-5 py-3 text-slate-300">
            <Clock3 size={18} className="text-blue-400" />
            24/7 AI Assistance
          </div>

          <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-5 py-3 text-slate-300">
            <ShieldCheck size={18} className="text-green-400" />
            Secure Conversations
          </div>

          <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-5 py-3 text-slate-300">
            <Bot size={18} className="text-cyan-400" />
            Smart Ticket Resolution
          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">

          <Button
            size="lg"
            className="group cursor-pointer rounded-xl px-8 py-6 text-base"
            
          >
            Start Getting Help
            <ArrowRight
              size={18}
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="cursor-pointer rounded-xl border-slate-600 bg-transparent px-8 py-6 text-base text-white hover:bg-slate-800"
          >
            Learn More
          </Button>

        </div>

        {/* Footer Text */}
        <p className="mt-10 text-sm text-slate-500">
          Powered by AI • Fast • Reliable • Always Available
        </p>

      </div>
    </div>
  );
}

export default ChatHome;