"use client";
import ContactList from "@/app/components/ContactList";
import { useState } from "react";
export default function contactpage() {
    const [selectedChat, setSelectedChat] = useState(null);

    return ( 
        <ContactList/>
    );
}