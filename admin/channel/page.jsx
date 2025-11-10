"use client";
import { useState } from "react";
import { FaFacebook, FaLine } from "react-icons/fa";
import { FolderDot } from "lucide-react";

export default function ChannelPage() {
  const [connectingChannel, setConnectingChannel] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Start", "Authorize", "Connected"];

  const handleConnect = (channel) => {
    setConnectingChannel(channel);
    setActiveStep(0);

    // จำลองการเชื่อมต่อ (สามารถแทนด้วย API จริงได้)
    setTimeout(() => setActiveStep(1), 3000);
    setTimeout(() => setActiveStep(2), 6000);
    setTimeout(() => setConnectingChannel(null), 9000);
  };

  return (
    <div className="w-full h-[95vh] p-6">
      <div className="bg-[rgba(32,41,59,0.25)] border border-white/20 backdrop-blur-2xl rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.35)] p-10 h-full flex flex-col">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <FolderDot className="text-white drop-shadow-lg" size={52} />
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-wide">Channel Catalog</h1>
            <p className="text-sm text-white/70 mt-1">
              Manage your messaging channels and discover new ones to help you acquire more customers.
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 my-8"></div>

        {/* Progress bar (แสดงตอนเชื่อมต่ออยู่) */}
        {connectingChannel && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="relative w-2/3">
              {/* เส้นพื้นหลัง */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-white/40 rounded-full -translate-y-1/2"></div>
              
              {/* เส้น progress */}
              <div
                className="absolute top-1/2 left-0 h-1 bg-linear-to-r from-pink-300 via-orange-300 to-purple-400 rounded-full transition-all duration-700"
                style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              ></div>

              {/* จุดแต่ละขั้น */}
              <div className="relative flex justify-between">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-5 h-5 rounded-full border-2 transition-all duration-500 ${
                      index <= activeStep
                        ? "bg-white border-white shadow-[0_0_15px_rgba(255,255,255,0.7)]"
                        : "border-white/40 bg-white/10"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
            <p className="text-white/70 text-sm">
              {steps[activeStep]} {connectingChannel === "facebook" ? "Facebook" : "Line"}
            </p>
          </div>
        )}

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          
          {/* Facebook Card */}
          <div className="group relative rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-6 shadow-xl flex justify-between items-center transition-all duration-300 hover:bg-white/20">
            <div className="flex items-center gap-4">
              <div className="w-12 flex items-center justify-center">
                <FaFacebook className="text-blue-400" size={28} />
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">Facebook</h2>
                <p className="text-white/60 text-sm">Connect your Facebook Page</p>
              </div>
            </div>
            <button
              onClick={() => handleConnect("facebook")}
              disabled={connectingChannel !== null}
              className="bg-white/20 border border-white/40 text-white rounded-lg px-4 py-1.5 text-sm transition-all duration-300 cursor-pointer hover:bg-white/30 hover:shadow-[0_0_30px_rgba(0,0,0,0.45)] disabled:opacity-50"
            >
              {connectingChannel === "facebook" ? "Connecting..." : "Connect"}
            </button>
          </div>

          {/* Line Card */}
          <div className="group relative rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-6 shadow-xl flex justify-between items-center transition-all duration-300 hover:bg-white/20">
            <div className="flex items-center gap-4">
              <div className="w-12 flex items-center justify-center">
                <FaLine className="text-green-400" size={28} />
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">Line</h2>
                <p className="text-white/60 text-sm">Connect your Line OA</p>
              </div>
            </div>
            <button
              onClick={() => handleConnect("line")}
              disabled={connectingChannel !== null}
              className="bg-white/20 border border-white/40 text-white rounded-lg px-4 py-1.5 text-sm transition-all duration-300 cursor-pointer hover:bg-white/30 hover:shadow-[0_0_30px_rgba(0,0,0,0.45)] disabled:opacity-50"
            >
              {connectingChannel === "line" ? "Connecting..." : "Connect"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
