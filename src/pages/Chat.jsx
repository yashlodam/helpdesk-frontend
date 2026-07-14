import React, { useEffect, useRef, useState } from 'react'
import { Search, MoreVertical, Send, Plus } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { ScrollArea } from '../components/ui/scroll-area'
import { Separator } from '../components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import MessageBubble from '../components/MessageBubble'
import { v4 as uuidv4 } from "uuid";
import { sendMessageToAi } from '../services/chat.service'

const CHATS = [
  { id: 1, name: "Spring Boot REST API", lastMessage: "How do I create REST APIs in Spring Boot?", unread: 2, initials: "SB" },
  { id: 2, name: "React Routing", lastMessage: "Explain nested routes in React Router.", unread: 0, initials: "RR" },
  { id: 3, name: "Docker Setup", lastMessage: "How do I dockerize my Spring Boot application?", unread: 1, initials: "DK" },
  { id: 4, name: "JWT Authentication", lastMessage: "JWT token expires after login.", unread: 3, initials: "JA" },
  { id: 5, name: "PostgreSQL", lastMessage: "Unable to connect to PostgreSQL database.", unread: 0, initials: "PG" },
  { id: 6, name: "Git & GitHub", lastMessage: "How to resolve merge conflicts?", unread: 4, initials: "GH" },
  { id: 7, name: "React Hooks", lastMessage: "When should I use useMemo?", unread: 0, initials: "RH" },
  { id: 8, name: "Spring Security", lastMessage: "Configure role-based authentication.", unread: 1, initials: "SS" },
  { id: 9, name: "Redis Cache", lastMessage: "Implement Redis caching in Spring Boot.", unread: 0, initials: "RC" },
];

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const CONVERSATION = [
  {
    id: uuidv4(),
    author: "bot",
    text: "Hello! How can I assist you with Spring Boot today?",
    at: formatTime(),
  },
];

function Chat() {
  const [messages, setMessages] = useState(CONVERSATION);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [conversationId, setConversationId] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    setConversationId(uuidv4());
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  async function sendMessages() {
    const textMessage = draft.trim();
    if (!textMessage || sending) return;

    // Optimistically add the user's own message
    setMessages((prev) => [
      ...prev,
      { id: uuidv4(), author: "user", text: textMessage, at: formatTime() },
    ]);
    setDraft("");
    setSending(true);

    try {
      const response = await sendMessageToAi(textMessage, conversationId);
      setMessages((prev) => [
        ...prev,
        { id: uuidv4(), author: "bot", text: response, at: formatTime() },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          author: "bot",
          text: "Sorry, something went wrong reaching the assistant. Please try again.",
          at: formatTime(),
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className='fixed top-0 left-0 right-0 mx-auto min-h-screen max-w-7xl grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] border-x'>
      <div>
        <aside className="hidden md:flex flex-col border-r h-full">
          <div className="p-3 flex items-center gap-2">
            <Button size="icon" variant="outline" aria-label="New chat">
              <Plus className="h-4 w-4" />
            </Button>

            <div className="relative flex-1">
              <Input placeholder="Search chats..." className="pl-8" aria-label="Search chats" />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <Separator />

          <ScrollArea className="flex-1 h-[calc(100vh-400px)]">
            <div className="p-2 space-y-2">
              {CHATS.map((chat) => (
                <button
                  key={chat.id}
                  className="w-full flex items-center gap-3 rounded-xl p-3 hover:bg-muted transition text-left"
                >
                  <Avatar>
                    <AvatarFallback>{chat.initials}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 text-left overflow-hidden">
                    <div className="font-medium text-sm">{chat.name}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {chat.lastMessage}
                    </div>
                  </div>

                  {chat.unread > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1">
                      {chat.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </aside>
      </div>

      <section className="flex flex-col h-screen">
        <div className="flex items-center justify-between px-5 py-4 border-b bg-background">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">AI Assistant</h2>
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

        <ScrollArea className="flex-1 bg-muted/20 h-[calc(100vh-150px)]">
          <div className='mx-auto max-w-3xl px-6 py-6 space-y-6'>
            {messages.map((chat) => (
              <MessageBubble key={chat.id} author={chat.author} at={chat.at}>
                {chat.text}
              </MessageBubble>
            ))}

            {sending && (
              <MessageBubble author="bot" at={formatTime()}>
                <span className="text-muted-foreground italic">Typing…</span>
              </MessageBubble>
            )}
          </div>
          <div ref={endRef}></div>
        </ScrollArea>

        <div className="border-t bg-background p-4">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <Input
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
              onClick={sendMessages}
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
    </div>
  );
}

export default Chat;