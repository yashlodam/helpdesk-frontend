import { div } from 'framer-motion/client'
import React from 'react'

function MessageBubble({key,author,at,children}) {

    const isMe = author

  return (
    <div className={`flex ${isMe=='user'} ?:"justify-end":"justify-start`}>

      <div className={`max-w-[65%] rounded-3xl px-3 py-2 shadow-sm ${isMe=='user'? "bg-slate-900 text-white" :"bg-muted text-foreground"}`}>
        <p className='whitespace-pre-wrap wrap-break-word leading-relaxed'>{children}</p>
      </div>
      <div className={`mt-1 text-[10px] ${isMe ? "text-white/70":"text-muted-foreground"}`}></div>
    </div>
  )
}

export default MessageBubble