import React from 'react'
import { Search ,MoreVertical, Send, Plus } from 'lucide-react'
import {Button} from "../components/ui/button"
import { Input } from "../components/ui/input"
import { ScrollArea } from '../components/ui/scroll-area'
import { Separator } from '../components/ui/separator'
import { Avatar,AvatarFallback,AvatarImage } from '../components/ui/avatar'

function Chat() {

  const CHATS = [
  {
    id: 1,
    name: "Spring Boot REST API",
    lastMessage: "How do I create REST APIs in Spring Boot?",
    unread: 2,
    initials: "SB",
  },
  {
    id: 2,
    name: "React Routing",
    lastMessage: "Explain nested routes in React Router.",
    unread: 0,
    initials: "RR",
  },
  {
    id: 3,
    name: "Docker Setup",
    lastMessage: "How do I dockerize my Spring Boot application?",
    unread: 1,
    initials: "DK",
  },
  {
    id: 4,
    name: "JWT Authentication",
    lastMessage: "JWT token expires after login.",
    unread: 3,
    initials: "JA",
  },
  {
    id: 5,
    name: "PostgreSQL",
    lastMessage: "Unable to connect to PostgreSQL database.",
    unread: 0,
    initials: "PG",
  },
  {
    id: 6,
    name: "Git & GitHub",
    lastMessage: "How to resolve merge conflicts?",
    unread: 4,
    initials: "GH",
  },
  {
    id: 7,
    name: "React Hooks",
    lastMessage: "When should I use useMemo?",
    unread: 0,
    initials: "RH",
  },
  {
    id: 8,
    name: "Spring Security",
    lastMessage: "Configure role-based authentication.",
    unread: 1,
    initials: "SS",
  },
  {
    id: 9,
    name: "Redis Cache",
    lastMessage: "Implement Redis caching in Spring Boot.",
    unread: 0,
    initials: "RC",
  },

];

const CONVERSATION = [
    {
        id:1,
        author:"bot",
        text:"Hello! How can I assist you with Spring Boot today?",
        at:"10:00 AM",
    },
    {
        id:2,
        author:"user",
        text:"Can you help me with the database migration?",
        at:"10:01 AM",
    }
]

  return (
    <div className='mx-auto min-h-screen max-w-7xl grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] border-x'>

      <div>
        {/*Sidebar*/}
        
        <aside className='hidden md:flex md:flex-col border-r'>

           <div className='p-3 flex items-center gap-2'>
            <Button size={'icon'} variant={'outline'} className={"h-8 w-8"}>
                <Plus className='h-4 w-4' />
            </Button>
            <div className='relative w-full'>
                <input placeholder='Search Chats..' className='h-9 w-full pl-8 border rounded' type="text" />
                <Search className='h-4 w-4 pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground'/>
            </div>
           </div>
        </aside>

      </div>

      <section>
        
        {/*header*/}
       <div className='flex items-center gap-3 px-4 py-3 border-b'>

        <Avatar>
            <AvatarImage src=""/>
            <AvatarFallback className={'text-xs'}></AvatarFallback>
        </Avatar>
        <div className='leading-tight'>
            <div className='text-sm font-medium'>
                Liza Support
            </div>
            <div className='text-xs text-muted-foreground'>
                Online. Typing...
            </div>
        </div>

        <div>
            <Button variant={"ghost"} size={'icon'} className={'h-8 w-8'}
            ><Search className={'h-4 w-3'}/></Button>
            <Button><MoreVertical/></Button>
        </div>

       </div>

      </section>
      
    </div>
  )
}

export default Chat