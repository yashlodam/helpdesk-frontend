import React from "react";

function MessageBubble({ author, at, children }) {
  const isMe = author === "user";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[65%] rounded-3xl px-4 py-2 shadow-sm ${
          isMe
            ? "bg-slate-900 text-white"
            : "bg-muted text-foreground"
        }`}
      >
        <p className="whitespace-pre-wrap break-words leading-relaxed">
          {children}
        </p>

        <div
          className={`mt-1 text-[10px] ${
            isMe ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          {at}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;