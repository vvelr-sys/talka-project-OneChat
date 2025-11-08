"use client";
import { useState } from "react";
import { FaTag } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { Edit, Trash2, Plus, X } from "lucide-react";
import EmojiPicker from "emoji-picker-react"; // <== Added

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTag, setEditTag] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newTag, setNewTag] = useState({
    name: "",
    color: "",
    description: "",
    emoji: "",
  });

  const colors = [
    "#FF4D4D",
    "#FF8C00",
    "#FFD700",
    "#32CD32",
    "#00CED1",
    "#1E90FF",
    "#BA55D3",
    "#FF69B4",
  ];

  const handleCreateTag = () => {
    if (!newTag.name || !newTag.color)
      return alert("Please fill name and color");
    setTags([...tags, { ...newTag, id: Date.now() }]);
    setNewTag({ name: "", color: "", description: "", emoji: "" });
    setIsModalOpen(false);
  };

  const handleDeleteTag = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const handleEditColor = (id, color) => {
    setTags(tags.map((tag) => (tag.id === id ? { ...tag, color } : tag)));
    setIsEditModalOpen(false);
  };

  return (
    <div className="w-full h-[95vh] p-4">
      <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl pt-5 px-4 h-full flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-start p-8">
          <div className="flex items-center gap-3">
            <FaTag className="text-white" size={52} />
            <div>
              <h1 className="text-xl font-semibold text-white">Tags</h1>
              <p className="text-sm text-white/70">Create and manage Tags to organize conversations and inboxes.</p>
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
          <Plus /> Create Tag
        </button>

        {/* Tags Display */}
        <div className="flex-1 flex flex-col justify-start text-center overflow-y-auto mt-8 px-10">
          {tags.length === 0 ? (
            <>
              <FaTag className="text-white/70 mb-6 mt-10 mx-auto" size={100} />
              <h2 className="text-white text-xl font-semibold mb-2">No Tags added yet</h2>
              <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">Tags added to your workspace will be listed here.</p>
            </>
          ) : (
            <div className="w-full flex flex-col gap-3">
              {tags.map((tag) => (
                <div key={tag.id} className="p-4 rounded-xl shadow-lg text-left bg-white/10 border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: tag.color }}></span>
                      <h3 className="text-white font-semibold">{tag.emoji} {tag.name}</h3>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <button
                        onClick={() => {
                          setEditTag(tag);
                          setIsEditModalOpen(true);
                        }}
                        className="flex items-center gap-1 bg-white/20 border border-white/40 text-white rounded-lg px-3 py-1 text-sm cursor-pointer hover:bg-white/30 transition"
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTag(tag.id)}
                        className="flex items-center gap-1 bg-red-500/30 border border-red-400 text-red-200 rounded-lg px-3 py-1 text-sm cursor-pointer hover:bg-red-500/50 transition"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm">{tag.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-[#1E1E1E] text-white rounded-2xl p-6 w-[400px] shadow-2xl border border-white/20">

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Create Tag</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer"><X size={22} /></button>
              </div>

              {/* Tag Name + Emoji */}
              <label className="text-sm">Tag Name</label>
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="bg-[#2b2b2b] px-3 py-2 rounded-lg cursor-pointer"
                >
                  {newTag.emoji || "😀"}
                </button>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-[#2b2b2b] text-white p-2 rounded-lg outline-none"
                  value={newTag.name}
                  onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                />
              </div>

              {showEmojiPicker && (
                <div className="mb-4">
                  <EmojiPicker
                    onEmojiClick={(emoji) => {
                      setNewTag({ ...newTag, emoji: emoji.emoji });
                      setShowEmojiPicker(false);
                    }}
                    theme="dark"
                  />
                </div>
              )}

              <label className="text-sm">Colors</label>
              <div className="flex gap-2 mt-2 mb-4">
                {colors.map((c) => (
                  <div
                    key={c}
                    onClick={() => setNewTag({ ...newTag, color: c })}
                    className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                      newTag.color === c ? "border-white scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: c }}
                  ></div>
                ))}
              </div>

              <label className="text-sm">Description</label>
              <textarea
                placeholder="Describe your tag"
                className="w-full bg-[#2b2b2b] text-white p-2 rounded-lg mb-4 outline-none resize-none"
                rows={3}
                value={newTag.description}
                onChange={(e) => setNewTag({ ...newTag, description: e.target.value })}
              />

              <div className="flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">Cancel</button>
                <button
                  onClick={handleCreateTag}
                  className="flex items-center gap-1 bg-white/20 border border-white/40 text-white rounded-lg px-3 py-1 text-sm cursor-pointer hover:bg-white/30 transition"
                >
                  Create Tag
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Color Modal */}
        {isEditModalOpen && editTag && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-[#1E1E1E] text-white rounded-2xl p-6 w-[400px] shadow-2xl border border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Edit Tag Color — {editTag.name}</h2>
                <button onClick={() => setIsEditModalOpen(false)}>✕</button>
              </div>

              <label className="text-sm">Select New Color</label>
              <div className="flex gap-2 mt-3 mb-4">
                {colors.map((c) => (
                  <div
                    key={c}
                    onClick={() => handleEditColor(editTag.id, c)}
                    className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                      editTag.color === c ? "border-white scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: c }}
                  ></div>
                ))}
              </div>

              <p className="text-gray-400 text-sm">Click a color to update this tag.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
