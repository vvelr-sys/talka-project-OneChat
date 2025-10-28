"use client";
import React, { useRef, useState } from "react";
import { Tooltip } from 'react-tooltip';
import Picker from "emoji-picker-react";

export default function ChatWindow({ chat }) {
    if (!chat) {
        return (
            <div className="flex-1 flex justify-center items-center text-white/60 text-lg">
                เลือกแชททางซ้ายเพื่อดูข้อความ
            </div>
        );
    }

    const textareaRef = useRef(null);
    const [height, setHeight] = useState(100);

    const handleMouseDown = (e) => {
        e.preventDefault();
        const startY = e.clientY;
        const startHeight = textareaRef.current.offsetHeight;

        const onMouseMove = (e) => {
            const delta = startY - e.clientY; // สลับเครื่องหมาย
            const newHeight = Math.max(50, startHeight + delta);
            setHeight(newHeight);
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    const editorRef = useRef(null);
    const fileInputRef = useRef(null);
    const [files, setFiles] = useState([]);

    // กดปุ่ม Picture → trigger input file
    const handleAttachClick = () => {
        fileInputRef.current.click();
    };

    // เมื่อเลือกไฟล์
    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles((prev) => [...prev, ...selectedFiles]);
        event.target.value = "";
    };

    // ลบไฟล์
    const handleRemoveFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    // Emoji
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const onEmojiClick = (emojiData) => {
        const editor = textareaRef.current;
        if (!editor) return;
        const startPos = editor.selectionStart;
        const endPos = editor.selectionEnd;
        const text = editor.value;
        editor.value = text.substring(0, startPos) + emojiData.emoji + text.substring(endPos);
        editor.selectionStart = editor.selectionEnd = startPos + emojiData.emoji.length;
        editor.focus();
    };

    return (
        <div className="w-[65%] h-[85vh] bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl p-5 mt-3 ml-3 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                        {chat.avatar}
                    </div>
                    <div>
                        <h2 className="text-white font-semibold text-lg">{chat.name}</h2>
                        {chat.isVip && (
                            <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                                VIP
                            </span>
                        )}
                        <span className="text-white/60 text-sm px-3">Open : {chat.time}</span>
                    </div>
                </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-auto space-y-3 text-white/90">
                <div className="self-start bg-white/20 px-4 py-2 rounded-2xl w-fit">
                    {chat.message}
                </div>
            </div>

            {/* Input Area */}
            <div className="mt-4 bg-[rgba(32,41,59,0.25)] relative group p-4 rounded-2xl shadow-2xs">
                <div className="input-field max-h-[300px]">
                    {/* Editor สำหรับพิมพ์ข้อความ */}
                    <textarea
                        ref={textareaRef}
                        style={{ height }}
                        className="w-full border rounded p-2 resize-none max-h-[300px]"
                        placeholder="พิมพ์ข้อความ..."
                    />

                    {/* Custom handle โผล่ตอน hover */}
                    <div onMouseDown={handleMouseDown} className="absolute top-1.5 left-1/2 -translate-x-1/2 w-15 h-1 bg-white rounded-full cursor-ns-resize opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="function-field flex justify-between mt-2">
                    <div className="left-funtion flex">

                        <div className="relative">
                            <button
                                data-tooltip-id="attach-tooltip"
                                data-tooltip-content="Ai prompt"
                                className="text-white text-[20px] px-3 py-2 transition"
                            >
                                <i className="fa-solid fa-wand-magic-sparkles"></i>
                            </button>
                            <Tooltip id="attach-tooltip" place="top" effect="solid" />
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                data-tooltip-id="attach-tooltip"
                                data-tooltip-content="Emoji"
                                className="text-white text-[20px] px-3 py-2 transition"
                            >
                                <i className="fa-solid fa-icons"></i>
                            </button>
                            <Tooltip id="attach-tooltip" place="top" effect="solid" />
                            {showEmojiPicker && (
                                <div className="absolute bottom-full right-0 mb-2 z-50">
                                    <Picker onEmojiClick={onEmojiClick} />
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                data-tooltip-id="attach-tooltip"
                                data-tooltip-content="Snippet"
                                className="text-white text-[20px] px-3 py-2 transition"
                            >
                                <i className="fa-solid fa-receipt"></i>
                            </button>
                            <Tooltip id="attach-tooltip" place="top" effect="solid" />
                        </div>

                        <div className="relative">
                            <button
                                onClick={handleAttachClick}
                                data-tooltip-id="attach-tooltip"
                                data-tooltip-content="Picture / File"
                                className="text-white text-[20px] px-3 py-2 transition"
                            >
                                <i className="fa-solid fa-image"></i>
                            </button>
                            <Tooltip id="attach-tooltip" place="top" effect="solid" />
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className="right-function">
                        <div className="relative">
                            <button
                                data-tooltip-id="attach-tooltip"
                                data-tooltip-content="ส่งข้อความ"
                                className="text-white text-[20px] px-3 py-2 transition"
                            >
                                <i className="fa-solid fa-paper-plane"></i>
                            </button>
                            <Tooltip id="attach-tooltip" place="top" effect="solid" />
                        </div>
                    </div>
                </div>

                {/* แสดงไฟล์เป็น tag แยกออกจากข้อความ */}
                {files.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {files.map((file, index) => {
                            const isImage = file.type.startsWith("image/");
                            return (
                                <span
                                    key={index}
                                    className="flex items-center bg-white/20 text-white px-3 py-1 rounded-full text-sm"
                                >
                                    {isImage ? (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            className="w-10 h-10 object-cover rounded-md"
                                        />
                                    ) : (
                                        <span className="truncate max-w-[100px]">{file.name}</span>
                                    )}
                                    <button
                                        onClick={() => handleRemoveFile(index)}
                                        className="ml-2 text-white hover:text-red-500"
                                    >
                                        ✕
                                    </button>
                                </span>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
