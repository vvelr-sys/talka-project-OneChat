"use client";
import React, { useState, useEffect } from 'react';

export default function AddContactModal({ 
    onClose, 
    onAdd, 
    AVAILABLE_TAGS = [], 
    AVAILABLE_CHANNELS = [] 
}) {
    
    const [formData, setFormData] = useState({
        name: "",
        email: null,
        phone: null,
        phonePrefix: "66+", 
        country: null, 
        tags: null,
        channel: null, 
        status: "Open" 
    });

    const [safeTags, setSafeTags] = useState([]);
    const [safeChannels, setSafeChannels] = useState([]);
    useEffect(() => {
        setSafeTags(AVAILABLE_TAGS || []);
        setSafeChannels(AVAILABLE_CHANNELS || []);
    }, [AVAILABLE_TAGS, AVAILABLE_CHANNELS]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = value === "" ? null : value;
        setFormData(prev => ({ ...prev, [name]: newValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-6 w-full max-w-md text-white"
                onClick={e => e.stopPropagation()} 
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-6">Add New Contact</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                        <input 
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 w-full text-white outline-0 bg-gray-700 rounded-lg py-2 px-4 border border-gray-600"
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Channel</label>
                        <select 
                            name="channel"
                            value={formData.channel}
                            onChange={handleChange}
                            className="mt-1 w-full text-white outline-0 bg-gray-700 rounded-lg py-2 px-4 border border-gray-600 appearance-none"
                        >
                            {safeChannels.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                        <div className="flex gap-2">
                            <select 
                                name="phonePrefix"
                                value={formData.phonePrefix}
                                onChange={handleChange}
                                className="text-white outline-0 bg-gray-700 rounded-lg py-2 px-3 border border-gray-600 appearance-none"
                            >
                                <option value="66+">66+</option>
                                <option value="1+">1+</option>
                            </select>
                            <input 
                                type="tel"
                                name="phone"
                                value={formData.phone || ""}
                                onChange={handleChange}
                                className="flex-1 w-full text-white outline-0 bg-gray-700 rounded-lg py-2 px-4 border border-gray-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                        <input 
                            type="email"
                            name="email"
                            value={formData.email || ""} 
                            onChange={handleChange}
                            className="mt-1 w-full text-white outline-0 bg-gray-700 rounded-lg py-2 px-4 border border-gray-600"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Country</label>
                        <select 
                            name="country"
                            value={formData.country || ""}
                            onChange={handleChange}
                            className="mt-1 w-full text-white outline-0 bg-gray-700 rounded-lg py-2 px-4 border border-gray-600 appearance-none"
                        >
                            <option value="">N/A</option>
                            <option value="Thailand">Thailand</option>
                            <option value="USA">USA</option>
                            <option value="Japan">Japan</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Tags</label>
                        <select 
                            name="tags"
                            value={formData.tags || ""}
                            onChange={handleChange}
                            className="mt-1 w-full text-white outline-0 bg-gray-700 rounded-lg py-2 px-4 border border-gray-600 appearance-none"
                        >
                            <option value="">N/A</option>
                            {safeTags.map(tag => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded-lg"
                        >
                            Create Contact
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

