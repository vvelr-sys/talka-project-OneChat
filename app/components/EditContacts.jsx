"use client";
import React, { useState, useEffect } from 'react';

export default function EditContactModal({ contact, onClose, onSave, AVAILABLE_TAGS }) {
    const [formData, setFormData] = useState(contact);

    useEffect(() => {
        setFormData(contact);
    }, [contact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = value === "" ? null : value;
        setFormData(prev => ({ ...prev, [name]: newValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        onSave(formData);
    };

    if (!contact) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-[rgba(42,51,69,0.7)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-2xl shadow-2xl p-6 w-full max-w-lg text-white relative"
                onClick={e => e.stopPropagation()} 
            >
                <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>
                
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl"
                >
                    &times;
                </button>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-4">
                        <img src={formData.imgUrl} alt={formData.name} className="w-16 h-16 rounded-full" />
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-300">Name</label>
                            <input 
                                type="text"
                                name="name"
                                value={formData.name || ""} 
                                onChange={handleChange}
                                className="mt-1 w-full text-white outline-0 bg-[rgba(32,41,59,0.5)] rounded-lg py-2 px-4 border border-gray-500/50"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <input 
                            type="email"
                            name="email"
                            value={formData.email || ""} 
                            onChange={handleChange}
                            className="mt-1 w-full text-white outline-0 bg-[rgba(32,41,59,0.5)] rounded-lg py-2 px-4 border border-gray-500/50"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Phone</label>
                        <input 
                            type="tel"
                            name="phone"
                            value={formData.phone || ""}
                            onChange={handleChange}
                            className="mt-1 w-full text-white outline-0 bg-[rgba(32,41,59,0.5)] rounded-lg py-2 px-4 border border-gray-500/50"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-300">Channel</label>
                            <input 
                                type="text"
                                name="channel"
                                value={formData.channel || ""} 
                                onChange={handleChange}
                                className="mt-1 w-full text-white outline-0 bg-[rgba(32,41,59,0.5)] rounded-lg py-2 px-4 border border-gray-500/50 disabled:bg-gray-700/50 disabled:text-gray-400 disabled:cursor-not-allowed"
                                disabled 
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-300">Tags</label>
                            <select 
                                name="tags"
                                value={formData.tags || ""}
                                onChange={handleChange}
                                className="mt-1 w-full text-white outline-0 bg-[rgba(32,41,59,0.5)] rounded-lg py-2 px-4 border border-gray-500/50 appearance-none" // appearance-none เพื่อให้สไตล์ custom ได้ (ต้องมี @tailwindcss/forms)
                            >
                                <option value="">N/A</option> 
                                {AVAILABLE_TAGS.map(tag => (
                                    <option key={tag} value={tag}>{tag}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500/30 hover:bg-gray-500/50 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[rgba(88,40,201,0.6)] hover:bg-[rgba(88,40,201,0.8)] text-white font-bold py-2 px-4 rounded-lg"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
