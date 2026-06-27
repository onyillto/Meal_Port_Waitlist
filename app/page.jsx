"use client";

import { useState } from "react";
import Image from "next/image";

const AVATARS = [
  { letter: "A", bg: "#4A6B8A" },
  { letter: "B", bg: "#1A7070" },
  { letter: "C", bg: "#5A6B7A" },
  { letter: "D", bg: "#2D5A6B" },
];

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 1.5C12 1.5 13 7.5 16 10.5C19 13.5 24 12 24 12C24 12 19 12 16 15C13 18 12 23 12 23C12 23 11 18 8 15C5 12 0 12 0 12C0 12 5 13.5 8 10.5C11 7.5 12 1.5 12 1.5Z"
          fill="#1A7070"
        />
      </svg>
    ),
    iconBg: "#eef8f8",
    title: "Premium Quality",
    desc: "Partnered with top-rated restaurants in your city",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C94B82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    iconBg: "#fdf0f5",
    title: "Lightning Fast",
    desc: "Average delivery time under 30 minutes",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A7070" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    iconBg: "#eef8f8",
    title: "Exclusive Perks",
    desc: "Special rewards and discounts for early members",
  },
];

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setShowModal(true);
        setTimeout(() => {
          window.location.href = "https://order.themealport.com/";
        }, 3000);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(145deg, #dff0ef 0%, #f4fafa 20%, #ffffff 50%, #fef2f7 80%, #fde8f2 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        {/* ── Header ─────────────────────────────────────────── */}
        <header className="mb-10">
          <div className="inline-flex items-center bg-white/70 backdrop-blur px-4 py-2 rounded-full shadow-sm border border-white/50">
            <Image
              src="/logo.png"
              alt="Meal Port"
              width={120}
              height={33}
              className="object-contain"
              priority
            />
          </div>
        </header>

        {/* ── Hero ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">
          {/* Left content */}
          <div className="space-y-6 pt-4">
            <h1 className="text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight">
              <span style={{ color: "#1A7070" }}>Delicious meals,</span>
              <br />
              <span style={{ color: "#C94B82" }}>delivered fast</span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed max-w-md">
              Join the waitlist and be the first to experience premium food
              delivery that brings restaurant-quality meals straight to your
              door.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-5 py-4 border border-gray-200 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 bg-white shadow-sm text-base"
                style={{ "--tw-ring-color": "#1A7070" }}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-white rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
                style={{ background: loading ? "#155c5c" : "#1A7070" }}
                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#155c5c"; }}
                onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#1A7070"; }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Joining...
                  </>
                ) : (
                  "Join the Waitlist →"
                )}
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>

            <p className="text-gray-500 text-sm">
              🎉 Be among the first 1,000 to get exclusive early access
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-8 pt-1">
              {/* Avatars + count */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {AVATARS.map(({ letter, bg }) => (
                    <div
                      key={letter}
                      className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-bold shadow"
                      style={{ background: bg }}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-base">2,847+</div>
                  <div className="text-gray-400 text-xs">People waiting</div>
                </div>
              </div>

              {/* Clock + time */}
              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: "#f0b8ce" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C94B82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-base">2 weeks</div>
                  <div className="text-gray-400 text-xs">Until launch</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right – image grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Large top image */}
            <div className="col-span-2 relative rounded-3xl overflow-hidden h-72 shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
                alt="Colorful salad bowl"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {/* 50% badge */}
              <div
                className="absolute top-4 right-4 w-16 h-16 rounded-full flex flex-col items-center justify-center text-white shadow-lg select-none"
                style={{ background: "#C94B82" }}
              >
                <span className="text-lg font-extrabold leading-none">50%</span>
                <span className="text-[10px] leading-tight font-medium">First Order</span>
              </div>
            </div>

            {/* Bottom-left */}
            <div className="relative rounded-3xl overflow-hidden h-52 shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=500&q=80"
                alt="Delicious plated meal"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>

            {/* Bottom-right */}
            <div className="relative rounded-3xl overflow-hidden h-52 shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80"
                alt="Takeout packaging"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* ── Features ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16 pb-10">
          {FEATURES.map(({ icon, iconBg, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50"
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
                style={{ background: iconBg }}
              >
                {icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-1.5">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Help button ────────────────────────────────────────── */}
      <button
        className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-base shadow-lg hover:bg-gray-700 transition-colors"
        aria-label="Help"
      >
        ?
      </button>

      {/* ── Success Modal ──────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 flex flex-col items-center text-center"
            style={{ animation: "scaleIn 0.25s ease-out" }}
          >
            {/* Logo */}
            <Image
              src="/logo.png"
              alt="Meal Port"
              width={130}
              height={36}
              className="object-contain mb-4"
            />

            {/* Checkmark circle */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ background: "linear-gradient(135deg, #1A7070, #2aadad)" }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h2 className="text-2xl font-extrabold text-gray-800 mb-2">You're on the list! 🎉</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Welcome to Meal Port! We'll notify <span className="font-semibold text-gray-700">{email}</span> as soon as we launch. Get ready for delicious meals delivered fast.
            </p>

            {/* Countdown bar */}
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  background: "#1A7070",
                  animation: "shrink 3s linear forwards",
                }}
              />
            </div>
            <p className="text-gray-400 text-xs mt-2">Redirecting you now…</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  );
}
