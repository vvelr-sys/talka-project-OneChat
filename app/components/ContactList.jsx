"use client";
import React, { useState, useEffect, useMemo } from 'react'; 
import { mockContacts } from '@/app/data/mockContacts'; 
import ContactDetail from '@/app/components/ContactDetail'; 
import FilterPopup from '@/app/components/FilterPopup';
import AddContactModal from '@/app/components/AddContact';


const AVAILABLE_TAGS = [...new Set(mockContacts.map(c => c.tags).filter(Boolean))];
const AVAILABLE_CHANNELS = [...new Set(mockContacts.map(c => c.channel).filter(Boolean))];
const AVAILABLE_STATUSES = ["Open", "Closed"];


export default function ContactList() {
    const [contacts, setContacts] = useState(mockContacts); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        channel: null,
        tag: null,
        status: null
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleRowClick = (contact) => {
        setSelectedContact(contact);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedContact(null);
    };
    const handleSaveChanges = (updatedContact) => {
        const contactToSave = { ...updatedContact };
        Object.keys(contactToSave).forEach(key => {
            if (contactToSave[key] === "") {
                contactToSave[key] = null;
            }
        });

        const newContacts = contacts.map(c => 
            c.id === contactToSave.id ? contactToSave : c
        );
        setContacts(newContacts);

        const mockIndex = mockContacts.findIndex(c => c.id === contactToSave.id);
        if (mockIndex !== -1) {
            mockContacts[mockIndex] = contactToSave;
        }

        handleCloseModal(); 
        console.log("Saved:", contactToSave); 
    };

    const handleDeleteContact = (contactId) => {
        const newContacts = contacts.filter(c => c.id !== contactId);
        setContacts(newContacts);
        
        const mockIndex = mockContacts.findIndex(c => c.id === contactId);
        if (mockIndex !== -1) {
            mockContacts.splice(mockIndex, 1);
        }
        console.log("Deleted:", contactId);
    };

    const handleAddContact = (newContactData) => {
        const newId = Date.now();
        const nameQuery = newContactData.name ? newContactData.name.replace(' ', '+') : 'New+User';
        const imgUrl = `https://ui-avatars.com/api/?name=${nameQuery}&background=random`;

        const newContact = {
            ...newContactData,
            id: newId,
            imgUrl: imgUrl,
        };

        setContacts(prevContacts => [newContact, ...prevContacts]);

        mockContacts.unshift(newContact);

        setIsAddModalOpen(false);
        console.log("Added:", newContact);
    };


    const filteredContacts = useMemo(() => {
        return contacts.filter(contact => {
            const nameMatch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());

            const channelMatch = !filters.channel || contact.channel === filters.channel;
            
            const tagMatch = !filters.tag || contact.tags === filters.tag;

            const statusMatch = !filters.status || contact.status === filters.status;

            return nameMatch && channelMatch && tagMatch && statusMatch;
        });
    }, [contacts, searchTerm, filters]); 


    return (
        <div className="w-full h-[95vh] p-2 md:p-4"> 
            <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl pt-5 px-4 h-full flex flex-col">
                
                <h1 className="text-white text-2xl font-bold mb-6 pl-4 pt-4">Contacts</h1>

                <div className="flex justify-between flex-col md:flex-row items-center mb-6 px-4 gap-4 md:gap-4"> 
                    
                    <div className="search flex items-center text-white bg-[rgba(32,41,59,0.25)] rounded-2xl py-2 px-4 w-full md:w-1/5 md:mr-5"> 
                        <i className="fa-solid fa-magnifying-glass mr-3"></i>
                        <input 
                            type="text" 
                            className="text-white outline-0 bg-transparent w-full" 
                            placeholder="Search Contact..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div 
                            className="addcontact shrink-0 flex items-center justify-center text-white bg-[rgba(88,40,201,0.4)] shadow-2xl rounded-2xl py-2 px-4 cursor-pointer hover:bg-[rgba(88,40,201,0.6)] w-full md:w-auto md:mr-3"
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            <i className="fa-solid fa-plus mr-3"></i>
                            <button>Add Contact</button> 
                        </div>

                        <div className="relative"> 
                            <button 
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`shrink-0 flex items-center justify-center text-white shadow-2xl rounded-2xl py-2 px-4 cursor-pointer  ${isFilterOpen ? 'bg-[rgba(88,40,201,0.6)]' : 'bg-[rgba(32,41,59,0.25)] hover:bg-[rgba(32,41,59,0.5)]'}`}
                            >
                                <i className="fa-solid fa-filter"></i>
                                <p className="pl-2">Filter</p>
                            </button>
                            
                            <FilterPopup 
                                isOpen={isFilterOpen}
                                onClose={() => setIsFilterOpen(false)}
                                currentFilters={filters}
                                onApplyFilters={(newFilters) => setFilters(newFilters)}

                                AVAILABLE_CHANNELS={AVAILABLE_CHANNELS}
                                AVAILABLE_TAGS={AVAILABLE_TAGS}
                                AVAILABLE_STATUSES={AVAILABLE_STATUSES}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto overflow-x-auto">
                    <div className="min-w-[960px]">

                        <div className="grid grid-cols-[auto_2fr_repeat(6,1fr)] gap-x-4 items-center py-3 border-b border-gray-500/30 text-gray-300 font-semibold text-sm px-4 ">
                            <input type="checkbox" className="bg-black border-gray-500/50 rounded" />
                            <span>Name</span>
                            <span>Channel</span>
                            <span>Email</span>
                            <span>Phone</span>
                            <span>Country</span>
                            <span>Tags</span>
                            <span>Status</span>
                        </div>

                        <div className="text-white text-sm">
                            {filteredContacts.map((contact) => (
                                <div 
                                    key={contact.id} 
                                    onClick={() => handleRowClick(contact)}
                                    className="grid grid-cols-[auto_2fr_repeat(6,1fr)] gap-x-4 items-center py-3 border-b border-gray-500/20 hover:bg-white/10 cursor-pointer px-4"
                                >
                                    <input 
                                        type="checkbox" 
                                        className=" border-gray-500/50 rounded focus:ring-0 focus:ring-offset-0 "
                                        onClick={e => e.stopPropagation()} 
                                    />
                                    
                                    <div className="flex items-center">
                                        <img src={contact.imgUrl} alt={contact.name} className="w-8 h-8 rounded-full mr-3" />
                                        <span>{contact.name}</span>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        {contact.channel === 'Facebook' && <i className="fa-brands fa-facebook mr-2 text-blue-500"></i>}
                                        {contact.channel === 'Instagram' && <i className="fa-brands fa-instagram mr-2 text-pink-500"></i>}
                                        {contact.channel === 'Line' && <i className="fa-brands fa-line mr-2 text-green-500"></i>}
                                        <span className={!contact.channel ? "text-gray-400" : ""}>{contact.channel || "N/A"}</span>
                                    </div>

                                    <span className={!contact.email ? "text-gray-400" : ""}>{contact.email || "N/A"}</span>
                                    
                                    <span className={!contact.phone ? "text-gray-400" : ""}>
                                        {contact.phone ? (
                                            <>
                                                {contact.phonePrefix && `${contact.phonePrefix}`}
                                                {contact.phone}
                                            </>
                                        ) : (
                                            "N/A"
                                        )}
                                    </span>

                                    <span className={!contact.country ? "text-gray-400" : ""}>
                                        {contact.country || "N/A"}
                                    </span>

                                    <div className="flex items-center">
                                        {contact.tags === 'VIP' ? (
                                            <>
                                                <i className="fa-solid fa-crown mr-2 text-yellow-400"></i>
                                                <span>{contact.tags}</span>
                                            </>
                                        ) : (
                                            <span className={!contact.tags ? "text-gray-400" : ""}>{contact.tags || "N/A"}</span>
                                        )}
                                    </div>

                                    <span className={!contact.status ? "text-gray-400" : ""}>{contact.status || "N/A"}</span>
                                </div>
                            ))}
                        </div>
                    </div> 
                </div> 

            </div>

            
            {isModalOpen && selectedContact && (
                <ContactDetail
                    contact={selectedContact}
                    onClose={handleCloseModal}
                    onSave={handleSaveChanges}
                    onDelete={handleDeleteContact} 
                    AVAILABLE_TAGS={AVAILABLE_TAGS}
                />
            )}

            {isAddModalOpen && (
                <AddContactModal
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={handleAddContact}
                    AVAILABLE_TAGS={AVAILABLE_TAGS}
                    AVAILABLE_CHANNELS={AVAILABLE_CHANNELS} 
                />
            )}
        </div> 
    );
}

