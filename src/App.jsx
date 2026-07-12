import React from 'react'
import { Button } from "@/components/ui/button"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ChatHome from './pages/ChatHome'
import Chat from './pages/Chat'
function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<ChatHome/>}/>
        <Route path='/chat' element={<Chat/>}/>
        
        </Routes> 

    </BrowserRouter>
  )
}

export default App