"use client";
import { CircleUser, Ban, Edit, Info, X } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [users, setUsers] = useState([
    { id: 1, name: "John", email: "john@email.com", permission: "Manager" },
    { id: 2, name: "Jane", email: "jane@email.com", permission: "Manager" },
    { id: 3, name: "Mike", email: "mike@email.com", permission: "Manager" },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("add"); // "add" | "edit"
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Manager");
  const [editId, setEditId] = useState(null);

  // ฟังก์ชันเปิด modal (Add)
  const openAddModal = () => {
    setMode("add");
    setEmail("");
    setRole("Manager");
    setIsOpen(true);
  };

  // ฟังก์ชันเปิด modal (Edit)
  const openEditModal = (user) => {
    setMode("edit");
    setEditId(user.id);
    setEmail(user.email);
    setRole(user.permission);
    setIsOpen(true);
  };

  // เพิ่ม user ใหม่
  const handleAddUser = () => {
    if (!email.trim()) return alert("Please enter an email.");

    const newUser = {
      id: Date.now(),
      name: email.split("@")[0],
      email: email,
      permission: role,
    };

    setUsers((prev) => [...prev, newUser]);
    setEmail("");
    setRole("Manager");
    setIsOpen(false);
  };

  // ลบ user
  const handleRemoveUser = (id) => {
    if (confirm("Are you sure you want to remove this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  // อัปเดต role ของ user
  const handleEditUser = () => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === editId ? { ...user, permission: role } : user
      )
    );
    setIsOpen(false);
  };

  return (
    <>
      {/* Modal (Add / Edit User) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="relative bg-[#12131a] text-white w-[480px] rounded-2xl border border-white/20 shadow-2xl p-6 md:p-8">
            {/* ปุ่มปิด */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-semibold">
                {mode === "add" ? "Add User" : "Edit User"}
              </h2>
              <Info size={18} className="text-gray-400" />
            </div>
            <hr className="border-white/20 mb-6" />

            {/* Email input */}
            <div className="mb-5">
              <label className="block text-sm mb-2">User email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                readOnly={mode === "edit"} // แก้ไขไม่ได้ในโหมด Edit
                className={`w-full ${
                  mode === "edit"
                    ? "bg-[#1c1d25]/70 cursor-not-allowed text-gray-400"
                    : "bg-[#1c1d25]"
                } border border-white/30 rounded-lg px-3 py-2 outline-none text-white placeholder-gray-400 focus:ring-2 focus:ring-white/40`}
              />
            </div>

            {/* Role select */}
            <div className="mb-5">
              <label className="block text-sm mb-2">Role</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#1c1d25] border border-white/30 rounded-lg px-3 py-2 text-white appearance-none focus:ring-2 focus:ring-white/40 cursor-pointer"
                >
                  <option>Manager</option>
                  <option>Editor</option>
                  <option>Viewer</option>
                </select>
                <div className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
                  ▼
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Managers have access to all modules but cannot delete other
                managers.
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-8">
              <a href="#" className="text-sm text-purple-400 hover:underline">
                Learn more
              </a>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                {mode === "add" ? (
                  <button
                    onClick={handleAddUser}
                    className="bg-white/20 border border-white/40 text-white px-5 py-1.5 rounded-lg cursor-pointer hover:bg-white/30 transition"
                  >
                    Add
                  </button>
                ) : (
                  <button
                    onClick={handleEditUser}
                    className="bg-[rgba(255,255,255,0.22)] shadow-2xl rounded-2xl py-3 px-5 cursor-pointer hover:bg-[#ffffff52] transition"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Layout หลัก */}
      <div className="w-full h-[95vh] p-2 md:p-4">
        <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl pt-5 px-4 h-full flex flex-col">
          {/* Header */}
          <div className="relative max-w-3xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <CircleUser className="text-white" size={52} />
              <div>
                <h1 className="text-xl font-semibold text-white">
                  User Setting
                </h1>
                <p className="text-sm text-white/70">
                  Change general Workspace-level settings.
                </p>
              </div>
            </div>
          </div>
          
            <div className="border-t border-white/28 mx-7 mb-8 mt-[-30]"></div>

          {/* Add User + Search */}
          <div className="flex justify-between items-center w-full mb-6 px-4 gap-4 md:gap-4">
            <button
              onClick={openAddModal}
              className="flex items-center text-white bg-[rgba(255,255,255,0.22)] shadow-2xl rounded-2xl py-3 px-5 cursor-pointer hover:bg-[#ffffff52] transition"
            >
              <i className="fa-solid fa-plus mr-2"></i> Add User
            </button>

            <p className="search flex items-center text-white bg-[rgba(255,255,255,0.22)] shadow-2xl rounded-2xl py-2 px-4 md:w-3x1 md:mr-0.5 gap-2 w-100">
              <i className="fa-solid fa-magnifying-glass mr-3"></i>
              <input
                type="text"
                className="text-white outline-0 bg-transparent w-full"
                placeholder="Search User..."
              />
            </p>
          </div>

          {/* User list */}
          <div className="flex flex-col gap-3 w-full">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.3)] rounded-2xl py-3 px-5 shadow-md backdrop-blur-md hover:bg-[rgba(255,255,255,0.2)] transition-all"
              >
                {/* Left side */}
                <div className="flex items-center gap-3">
                  <CircleUser className="text-white" size={36} />
                  <div>
                    <p className="text-white font-semibold">{user.name}</p>
                    <p className="text-white/70 text-sm">
                      {user.permission} - {user.email}
                    </p>
                  </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRemoveUser(user.id)}
                    className="flex items-center gap-1 bg-red-500/30 border border-red-400 text-red-200 rounded-lg px-3 py-1 text-sm cursor-pointer hover:bg-red-500/50 transition"
                  >
                    <Ban size={16} /> remove
                  </button>
                  <button
                    onClick={() => openEditModal(user)}
                    className="flex items-center gap-1 bg-white/20 border border-white/40 text-white rounded-lg px-3 py-1 text-sm cursor-pointer hover:bg-white/30 transition"
                  >
                    <Edit size={16} /> Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
