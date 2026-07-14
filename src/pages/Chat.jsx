import React, { useEffect, useRef, useState } from 'react'
import { Search, MoreVertical, Send, Plus, Menu, X, RefreshCw, Bot } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { ScrollArea } from '../components/ui/scroll-area'
import { Separator } from '../components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import MessageBubble from '../components/MessageBubble'
import { v4 as uuidv4 } from "uuid";
import { sendMessageToAi } from '../services/chat.service'

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getInitials(title) {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "NC";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function truncate(text, max = 40) {
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

function createEmptyChat() {
  const id = uuidv4();
  return {
    id,
    title: "New chat",
    lastMessage: "Start the conversation…",
    messages: [],
    updatedAt: Date.now(),
  };
}

function ChatListItem({ chat, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 rounded-xl p-3 transition text-left ${
        active ? "bg-muted" : "hover:bg-muted/60"
      }`}
    >
      <Avatar>
        <AvatarFallback>{getInitials(chat.title)}</AvatarFallback>
      </Avatar>

      <div className="flex-1 text-left overflow-hidden">
        <div className="font-medium text-sm truncate">{chat.title}</div>
        <div className="text-xs text-muted-foreground truncate">{chat.lastMessage}</div>
      </div>
    </button>
  );
}

function SidebarContent({ query, setQuery, filteredChats, activeChatId, onSelectChat, onNewChat }) {
  return (
    <>
      <div className="p-3 flex items-center gap-2 shrink-0">
        <Button size="icon" variant="outline" aria-label="New chat" onClick={onNewChat}>
          <Plus className="h-4 w-4" />
        </Button>

        <div className="relative flex-1">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chats..."
            className="pl-8"
            aria-label="Search chats"
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <Separator className="shrink-0" />

      <ScrollArea className="flex-1 min-h-0 sidebar-scroll">
        <div className="p-2 space-y-2">
          {filteredChats.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No chats found.</p>
          ) : (
            filteredChats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                active={chat.id === activeChatId}
                onClick={() => onSelectChat(chat.id)}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </>
  );
}

function Chat() {
  const [chats, setChats] = useState(() => [createEmptyChat()]);
  const [activeChatId, setActiveChatId] = useState(() => chats[0].id);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? chats[0];

  const filteredChats = [...chats]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .filter((c) => c.title.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeChatId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages, sending]);

  function updateChat(chatId, updater) {
    setChats((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, ...updater(c) } : c))
    );
  }

  function handleNewChat() {
    const newChat = createEmptyChat();
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setDraft("");
    setMobileSidebarOpen(false);
  }

  async function sendMessages(overrideText) {
    const textMessage = (overrideText ?? draft).trim();
    if (!textMessage || sending || !activeChat) return;

    const chatId = activeChat.id;

    if (!overrideText) {
      updateChat(chatId, (c) => ({
        messages: [
          ...c.messages,
          { id: uuidv4(), author: "user", text: textMessage, at: formatTime() },
        ],
        title: c.messages.length === 0 ? truncate(textMessage) : c.title,
        lastMessage: truncate(textMessage),
        updatedAt: Date.now(),
      }));
      setDraft("");
    }
    setSending(true);

    try {
      const response = await sendMessageToAi(textMessage, chatId);
      updateChat(chatId, (c) => ({
        messages: [
          ...c.messages,
          { id: uuidv4(), author: "bot", text: response, at: formatTime() },
        ],
        lastMessage: truncate(response),
        updatedAt: Date.now(),
      }));
    } catch (err) {
      updateChat(chatId, (c) => ({
        messages: [
          ...c.messages,
          {
            id: uuidv4(),
            author: "bot",
            isError: true,
            text: "Something went wrong reaching the assistant.",
            retryText: textMessage,
            at: formatTime(),
          },
        ],
        lastMessage: "Something went wrong",
        updatedAt: Date.now(),
      }));
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  }

  function retry(text) {
    sendMessages(text);
  }

  return (
    <div className='fixed top-0 left-0 right-0 mx-auto min-h-screen max-w-7xl grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] border-x'>
      {/* Desktop sidebar */}
      <div className="hidden md:block h-screen">
        <aside className="flex flex-col border-r h-screen">
          <SidebarContent
            query={query}
            setQuery={setQuery}
            filteredChats={filteredChats}
            activeChatId={activeChatId}
            onSelectChat={setActiveChatId}
            onNewChat={handleNewChat}
          />
        </aside>
      </div>

      {/* Mobile sidebar drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-[80%] bg-background border-r h-full flex flex-col">
            <div className="flex items-center justify-between p-3 shrink-0">
              <span className="font-medium text-sm">Chats</span>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Close sidebar"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <SidebarContent
              query={query}
              setQuery={setQuery}
              filteredChats={filteredChats}
              activeChatId={activeChatId}
              onSelectChat={(id) => {
                setActiveChatId(id);
                setMobileSidebarOpen(false);
              }}
              onNewChat={handleNewChat}
            />
          </div>
        </div>
      )}

      <section className="flex flex-col h-screen">
        <div className="flex items-center justify-between px-5 py-4 border-b bg-background">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              aria-label="Open chat list"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>

            <Avatar>
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold truncate max-w-[180px] sm:max-w-xs">
                {activeChat?.title ?? "AI Assistant"}
              </h2>
              <p className="text-xs text-green-500">● Online</p>
            </div>
          </div>

          <div className="flex gap-1">
            <Button variant="ghost" size="icon" aria-label="Search in conversation">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="More options">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 min-h-0 bg-muted/20">
          <div className='mx-auto max-w-3xl px-6 py-6 space-y-6'>
            {activeChat?.messages.length === 0 && !sending && (
              <div className="flex flex-col items-center justify-center text-center gap-3 py-24 text-muted-foreground">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <Bot className="h-6 w-6" />
                </div>
                <p className="text-sm">
                  Welcome to the AI Help Desk. Get instant assistance with technical issues, account inquiries, and support requests.
                </p>
              </div>
            )}

            {activeChat?.messages.map((chat) => (
              <div key={chat.id}>
                <MessageBubble author={chat.author} at={chat.at}>
                  <span className={chat.isError ? "text-destructive" : ""}>{chat.text}</span>
                </MessageBubble>
                {chat.isError && (
                  <div className="flex justify-start mt-1 ml-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs gap-1"
                      onClick={() => retry(chat.retryText)}
                    >
                      <RefreshCw className="h-3 w-3" />
                      Retry
                    </Button>
                  </div>
                )}
              </div>
            ))}

            {sending && (
              <MessageBubble author="bot" at={formatTime()}>
                <div className="flex items-center gap-1 py-1">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                </div>
              </MessageBubble>
            )}
          </div>
          <div ref={endRef}></div>
        </ScrollArea>

        <div className="border-t bg-background p-4">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Message AI..."
              className="rounded-full h-11"
              disabled={sending}
              aria-label="Message input"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessages();
                }
              }}
            />

            <Button
              onClick={() => sendMessages()}
              disabled={sending || !draft.trim()}
              size="icon"
              className="rounded-full h-11 w-11 cursor-pointer"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <style>{`
        .sidebar-scroll [data-radix-scroll-area-viewport] {
          scrollbar-width: thin;
          scrollbar-color: hsl(var(--border)) transparent;
        }
        .sidebar-scroll [data-radix-scroll-area-viewport]::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-scroll [data-radix-scroll-area-viewport]::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scroll [data-radix-scroll-area-viewport]::-webkit-scrollbar-thumb {
          background-color: hsl(var(--border));
          border-radius: 9999px;
        }
        .sidebar-scroll [data-radix-scroll-area-viewport]::-webkit-scrollbar-thumb:hover {
          background-color: hsl(var(--muted-foreground) / 0.5);
        }
      `}</style>
    </div>
  );
}

export default Chat;