"use client";
import React, { useState, useEffect } from 'react';


export default function FilterPopup({ 
    isOpen, 
    onClose, 
    currentFilters, 
    onApplyFilters, 
    AVAILABLE_CHANNELS = [], 
    AVAILABLE_TAGS = [], 
    AVAILABLE_STATUSES = [] 
}) {
    const [localFilters, setLocalFilters] = useState(currentFilters);

    useEffect(() => {
        setLocalFilters(currentFilters);
    }, [currentFilters]);

    const handleRadioChange = (filterType, value) => {
        setLocalFilters(prev => ({ ...prev, [filterType]: value }));
    };

    const handleApply = () => {
        onApplyFilters(localFilters);
        onClose();
    };

    const handleClear = () => {
        const clearedFilters = { channel: null, tag: null, status: null };
        setLocalFilters(clearedFilters);
        onApplyFilters(clearedFilters);
        onClose();
    };

    if (!isOpen) return null;

    const FilterRadio = ({ group, value, label }) => (
        <label className="flex items-center space-x-2 cursor-pointer text-gray-200 hover:text-white">
            <input 
                type="radio" 
                name={group} 
                value={value || ""}
                checked={localFilters[group] === value}
                onChange={() => handleRadioChange(group, value)}
                className="bg-transparent border-gray-500/50 text-purple-500 focus:ring-0 focus:ring-offset-0"
            />
            <span>{label}</span>
        </label>
    );

    return (
        <div 
            className="absolute z-40 top-14 right-0 w-72 bg-[rgba(32,41,59,0.7)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-2xl shadow-2xl p-6 text-white"
        >
            <h3 className="text-xl font-bold mb-4">Filter</h3>
            
            <div className="mb-4">
                <h4 className="font-semibold mb-2 text-gray-300">Channels</h4>
                <div className="space-y-2">
                    <FilterRadio group="channel" value={null} label="All" />
                    {AVAILABLE_CHANNELS.map(channel => (
                        <FilterRadio key={channel} group="channel" value={channel} label={channel} />
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <h4 className="font-semibold mb-2 text-gray-300">Tags</h4>
                <div className="space-y-2">
                    <FilterRadio group="tag" value={null} label="All" />
                    {AVAILABLE_TAGS.map(tag => (
                        <FilterRadio key={tag} group="tag" value={tag} label={tag} />
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h4 className="font-semibold mb-2 text-gray-300">Status</h4>
                <div className="space-y-2">
                    <FilterRadio group="status" value={null} label="All" />
                    {AVAILABLE_STATUSES.map(status => (
                        <FilterRadio key={status} group="status" value={status} label={status} />
                    ))}
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={handleClear}
                    className="bg-gray-500/30 hover:bg-gray-500/50 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Clear All
                </button>
                <button
                    onClick={handleApply}
                    className="bg-[rgba(88,40,201,0.6)] hover:bg-[rgba(88,40,201,0.8)] text-white font-bold py-2 px-4 rounded-lg"
                >
                    Apply
                </button>
            </div>
        </div>
    );
}

