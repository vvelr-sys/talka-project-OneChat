"use client";
import ChatList from "@/app/components/ChatList.jsx";
import ChatMessage from '@/app/components/ChatMessage.jsx';
import ChatFitter from "@/app/components/ChatFitter";
import "@/app/assets/css/other.css"
import { useState } from "react";

export default function ChatPage() {
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <div className="container mx-auto">
            
            <ChatFitter/>

            <div className="flex h-">
                <ChatList onSelectChat={(chat) => setSelectedChat(chat)}
                    selectedId={selectedChat?.id} />

                <ChatMessage chat={selectedChat}/>
            </div>
        </div>
    );
}
