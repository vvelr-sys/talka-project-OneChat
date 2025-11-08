"use client";
import { Info, X, Trash2, Edit } from "lucide-react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useEffect, useState } from "react";

//  แยก TeamModal ออกมาเป็น Component ด้านนอก

function TeamModal({
  isOpen,
  title,
  onClose,
  onConfirm,
  teamName,
  setTeamName,
  teamDesc,
  setTeamDesc,
  teamMembers,
  setTeamMembers,
  userOptions,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="relative bg-[#12131a] text-white w-[550px] rounded-2xl border border-white/20 shadow-2xl p-6 md:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
        >
          <X size={22} />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <Info size={18} className="text-gray-400" />
        </div>
        <hr className="border-white/20 mb-6" />

        {/* Team Name */}
        <div className="mb-5">
          <label className="block text-sm mb-2">Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Team name Ex. I love U"
            className="w-full bg-[#1c1d25] border border-white/30 rounded-lg px-3 py-2 outline-none text-white"
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block text-sm mb-2">Description</label>
          <textarea
            value={teamDesc}
            onChange={(e) => setTeamDesc(e.target.value)}
            rows={3}
            placeholder="Add team description"
            className="w-full bg-[#1c1d25] border border-white/30 rounded-lg px-3 py-2 outline-none text-white resize-none"
          />
        </div>

        {/* Members */}
        <div className="mb-5">
          <label className="block text-sm mb-2">Team Members</label>
          <select
            multiple
            value={teamMembers}
            onChange={(e) =>
              setTeamMembers(
                Array.from(e.target.selectedOptions, (o) => o.value)
              )
            }
            className="w-full bg-[#1c1d25] border border-white/30 rounded-lg px-3 py-2 text-white h-[110px]"
          >
            {userOptions.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-white/20 border border-white/40 text-white px-5 py-1.5 rounded-lg hover:bg-white/30"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// Component หลัก: Page

export default function Page() {
  const [teams, setTeams] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTeam, setEditTeam] = useState(null);

  const [teamName, setTeamName] = useState("");
  const [teamDesc, setTeamDesc] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  const userOptions = ["John", "Jane", "Mike", "Sarah", "Tom", "Lily"];

  // โหลดทีมจาก localStorage
  useEffect(() => {
    const storedTeams = localStorage.getItem("teams");
    if (storedTeams) setTeams(JSON.parse(storedTeams));
  }, []);

  // บันทึกทีมลง localStorage ทุกครั้งที่ teams เปลี่ยน
  useEffect(() => {
    localStorage.setItem("teams", JSON.stringify(teams));
  }, [teams]);

  const resetForm = () => {
    setTeamName("");
    setTeamDesc("");
    setTeamMembers([]);
  };

  // ตรวจสอบก่อนสร้างทีม
  const validateTeam = (isEdit = false) => {
    if (!teamName.trim()) {
      alert("Please enter a team name");
      return false;
    }

    const duplicate = teams.some(
      (t) =>
        t.name.toLowerCase() === teamName.trim().toLowerCase() &&
        (!isEdit || t.id !== editTeam?.id)
    );
    if (duplicate) {
      alert("This team name already exists");
      return false;
    }

    if (teamMembers.length === 0) {
      alert("Please select at least one member");
      return false;
    }

    return true;
  };

  // เพิ่มทีมใหม่
  const handleAddTeam = () => {
    if (!validateTeam()) return;

    const newTeam = {
      id: crypto.randomUUID(),
      name: teamName.trim(),
      desc: teamDesc.trim(),
      members: teamMembers,
      createdAt: new Date().toISOString(),
    };

    setTeams((prev) => [...prev, newTeam]);
    resetForm();
    setIsAddOpen(false);
  };

  // ลบทีม
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this team?")) {
      setTeams((prev) => prev.filter((team) => team.id !== id));
    }
  };

  // เปิด modal แก้ไข
  const handleOpenEdit = (team) => {
    setEditTeam(team);
    setTeamName(team.name);
    setTeamDesc(team.desc);
    setTeamMembers(team.members);
    setIsEditOpen(true);
  };

  // บันทึกการแก้ไข
  const handleSaveEdit = () => {
    if (!validateTeam(true)) return;

    setTeams((prev) =>
      prev.map((t) =>
        t.id === editTeam.id
          ? {
              ...t,
              name: teamName.trim(),
              desc: teamDesc.trim(),
              members: teamMembers,
            }
          : t
      )
    );

    resetForm();
    setEditTeam(null);
    setIsEditOpen(false);
  };

  // Layout
  return (
    <>
      {/* Add Modal */}
      <TeamModal
        isOpen={isAddOpen}
        title="Add Team"
        onClose={() => setIsAddOpen(false)}
        onConfirm={handleAddTeam}
        teamName={teamName}
        setTeamName={setTeamName}
        teamDesc={teamDesc}
        setTeamDesc={setTeamDesc}
        teamMembers={teamMembers}
        setTeamMembers={setTeamMembers}
        userOptions={userOptions}
      />

      {/* Edit Modal */}
      <TeamModal
        isOpen={isEditOpen}
        title="Edit Team"
        onClose={() => {
          setIsEditOpen(false);
          setEditTeam(null);
        }}
        onConfirm={handleSaveEdit}
        teamName={teamName}
        setTeamName={setTeamName}
        teamDesc={teamDesc}
        setTeamDesc={setTeamDesc}
        teamMembers={teamMembers}
        setTeamMembers={setTeamMembers}
        userOptions={userOptions}
      />

      <div className="w-full h-[95vh] p-2 md:p-4">
        <div className="bg-[rgba(32,41,59,0.25)] border border-[rgba(254,253,253,0.5)] backdrop-blur-xl rounded-3xl shadow-2xl pt-5 px-4 flex flex-col h-full">
          {/* Header */}
          <div className="relative max-w-3xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <HiOutlineUserGroup className="text-white" size={52} />
              <div>
                <h1 className="text-xl font-semibold text-white">
                  Team Setting
                </h1>
                <p className="text-sm text-white/70">
                  Manage your teams and members.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/28 mx-7 mb-8"></div>

          {/* Controls */}
          <div className="flex justify-between items-center w-full mb-6 px-4 gap-4">
            <button
              onClick={() => {
                resetForm();
                setIsAddOpen(true);
              }}
              className="flex items-center text-white bg-[rgba(255,255,255,0.22)] rounded-2xl py-3 px-5 hover:bg-[#ffffff52]"
            >
              <i className="fa-solid fa-plus mr-2"></i> Add Team
            </button>

            <div className="flex items-center text-white bg-[rgba(255,255,255,0.22)] rounded-2xl py-2 px-4 gap-2 w-[250px]">
              <i className="fa-solid fa-magnifying-glass mr-3"></i>
              <input
                type="text"
                className="text-white outline-0 bg-transparent w-full"
                placeholder="Search Team..."
              />
            </div>
          </div>

          {/* Team List */}
          <div className="flex justify-center items-center px-4">
            {teams.length === 0 ? (
              <div className="flex flex-col items-center text-center">
                <HiOutlineUserGroup className="text-white/70" size={250} />
                <h2 className="text-white text-xl font-semibold mb-2">
                  Create your first team
                </h2>
                <p className="text-gray-400 text-sm max-w-md">
                  Teams can be used to group users together to organize inboxes
                  and contact assignments.
                </p>
              </div>
            ) : (
              <div className="w-full space-y-4 overflow-y-auto">
                {teams.map((team) => (
                  <div
                    key={team.id}
                    className="bg-[#ffffff21] border border-white/20 rounded-xl p-4 text-white flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{team.name}</h3>
                      <p className="text-sm text-gray-400 mb-2">
                        {team.desc || "No description"}
                      </p>
                      <p className="text-xs text-gray-300">
                        Members:{" "}
                        {team.members.length <= 3 ? (
                          team.members.join(", ")
                        ) : (
                          <>
                            {team.members.slice(0, 3).join(", ")}{" "}
                            <span className="text-gray-400">
                              +{team.members.length - 3} more
                            </span>
                          </>
                        )}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDelete(team.id)}
                        className="flex items-center gap-1 bg-red-500/30 border border-red-400 text-red-200 rounded-lg px-3 py-1 hover:bg-red-500/50"
                      >
                        <Trash2 size={16} /> Delete
                      </button>

                      <button
                        onClick={() => handleOpenEdit(team)}
                        className="flex items-center gap-1 bg-white/20 border border-white/40 rounded-lg px-3 py-1 hover:bg-white/30"
                      >
                        <Edit size={16} /> Manage
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
