"use client";
import React, { useState, useEffect } from 'react';

export default function ContactDetail({ contact, onClose, onSave, onDelete, AVAILABLE_TAGS }) {
    const [formData, setFormData] = useState(contact);
    
    const [safeTags, setSafeTags] = useState([]);

    useEffect(() => {
        setFormData(contact);
    }, [contact]);

    useEffect(() => {
        if (AVAILABLE_TAGS && Array.isArray(AVAILABLE_TAGS)) {
            setSafeTags(AVAILABLE_TAGS);
        } else {
            setSafeTags([]); 
        }
    }, [AVAILABLE_TAGS]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = value === "" ? null : value;
        setFormData(prev => ({ ...prev, [name]: newValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        onSave(formData);
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(contact.id);
        }
        onClose();
    };

    if (!contact) return null;

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

                <h2 className="text-2xl font-bold mb-4">Contact details</h2>
                
                <div className="flex items-center gap-4 mb-4">
                    <img src={formData.imgUrl} alt={formData.name} className="w-16 h-16 rounded-full bg-gray-600" />
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold">{formData.name}</h3>
                    </div>
                    {formData.channel === 'Facebook' && <i className="fa-brands fa-facebook text-3xl text-blue-500"></i>}
                    {formData.channel === 'Instagram' && <i className="fa-brands fa-instagram text-3xl text-pink-500"></i>}
                    {formData.channel === 'Line' && <i className="fa-brands fa-line text-3xl text-green-500"></i>}
                </div>

                <div className="flex items-center gap-2 mb-6">
                    <select 
                        name="assignedUser"
                        value={formData.assignedUser || "Admin"}
                        onChange={handleChange}
                        className="flex-1 text-white outline-0 bg-gray-700 rounded-lg py-2 px-4 border border-gray-600 appearance-none"
                    >
                        <option value="Admin">User nameAdmin</option>
                        <option value="User">User nameUser</option>
                    </select>
                    <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                        <i className="fa-solid fa-comment"></i>
                    </button>
                </div>

                <h3 className="text-lg font-semibold mb-3">Contact fields</h3>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                        <div className="flex gap-2">
                            <select 
                                name="phonePrefix"
                                value={formData.phonePrefix || '66+'}
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
                            onClick={handleDelete} 
                            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            Delete
                        </button>
                        <button
                            type="submit"
                            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded-lg"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

