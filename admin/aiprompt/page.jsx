"use client";
import { useState } from "react";
import { Bot, Plus, Edit, Trash2, X } from "lucide-react";
import { MdMenuBook } from "react-icons/md";

export default function AiPromptsPage() {
  const [prompts, setPrompts] = useState([
    {
      id: 1,
      name: "Change tone",
      action:
        "Adjust the tone to sound more professional, friendly, empathetic, or straightforward.",
      active: true,
      isDefault: true,
    },
    {
      id: 2,
      name: "Translate",
      action: "Translate the message into your selected language.",
      active: true,
      isDefault: true,
    },
    {
      id: 3,
      name: "Fix spelling and grammar",
      action: "Automatically correct grammar, spelling, and punctuation.",
      active: true,
      isDefault: true,
    },
    {
      id: 4,
      name: "Simplify language",
      action: "Make the message easier to read and understand.",
      active: true,
      isDefault: true,
    },
  ]);

  const [newPrompt, setNewPrompt] = useState({ name: "", action: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPrompt = () => {
    if (!newPrompt.name) return alert("Please enter a prompt name");
    setPrompts([
      ...prompts,
      { id: Date.now(), ...newPrompt, active: true, isDefault: false },
    ]);
    setNewPrompt({ name: "", action: "" });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setPrompts(prompts.filter((p) => p.id !== id));
  };

  const handleToggle = (id) => {
    setPrompts(
      prompts.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  return (
    <div className="w-full h-[95vh] p-4">
      <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl pt-5 px-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start p-8">
          <div className="flex items-center gap-3">
            <Bot className="text-white" size={52} />
            <div>
              <h1 className="text-xl font-semibold text-white">AI Prompts</h1>
              <p className="text-sm text-white/70">
                Use AI Prompts to customize and improve how responses are
                written.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-white/80 py-2 px-4 cursor-pointer transition">
              <MdMenuBook size={20} />
              <span className="text-sm">Learn more</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/28 mx-7 mb-4"></div>

        {/* Add button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex w-fit mx-10 items-center gap-1 text-white bg-[rgba(255,255,255,0.22)] shadow-2xl rounded-xl py-2 px-4 cursor-pointer hover:bg-[#ffffff52] transition"
        >
          <Plus /> New Prompt
        </button>

        {/* Prompt list */}
        <div className="flex-1 flex flex-col justify-start text-center overflow-y-auto mt-8 px-10 gap-3">
          {prompts.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center bg-white/10 border border-white/20 rounded-xl p-4"
            >
              <div className="text-left">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-white/70">{p.action}</p>
              </div>

              <div className="flex items-center gap-3">
                {/* ถ้าไม่ใช่ default prompt ถึงจะมีปุ่ม Delete / Edit */}
                {!p.isDefault && (
                  <>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="flex items-center gap-1 bg-red-500/30 border border-red-400 text-red-200 rounded-lg px-3 py-1 text-sm hover:bg-red-500/50 transition"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                    <button className="flex items-center gap-1 bg-white/20 border border-white/40 text-white rounded-lg px-3 py-1 text-sm hover:bg-white/30 transition">
                      <Edit size={16} />
                      Edit
                    </button>
                  </>
                )}

                {/* Toggle switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={p.active}
                    onChange={() => handleToggle(p.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:bg-purple-500 transition-all"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-all"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Prompt Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-[#1E1E1E] text-white rounded-2xl p-6 w-[400px] shadow-2xl border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add AI Prompt</h2>
              <button onClick={() => setIsModalOpen(false)}className="text-gray-400 hover:text-white cursor-pointer"><X size={22} /></button>
            </div>

            <label className="text-sm">Prompt Name</label>
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-[#2b2b2b] text-white p-2 rounded-lg mb-4 outline-none"
              value={newPrompt.name}
              onChange={(e) =>
                setNewPrompt({ ...newPrompt, name: e.target.value })
              }
            />

            <label className="text-sm">Prompt Action</label>
            <textarea
              placeholder="Describe what this prompt does"
              className="w-full bg-[#2b2b2b] text-white p-2 rounded-lg mb-4 outline-none resize-none"
              rows={3}
              value={newPrompt.action}
              onChange={(e) =>
                setNewPrompt({ ...newPrompt,action: e.target.value })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPrompt}
                className="flex items-center gap-1 bg-white/20 border border-white/40 text-white rounded-lg px-3 py-1 text-sm hover:bg-white/30 transition cursor-pointer"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
