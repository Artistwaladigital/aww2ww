import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Film, MessageCircle, Sparkles, Users, X, Camera, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { API_URL } from '../../api/client';

export const FacebookLandingPage: React.FC = () => {
  const { login, register, showToast } = useApp();

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Sign Up Modal State
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regAvatar, setRegAvatar] = useState('');
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameOrEmail.trim()) {
      showToast('Please enter your email or username');
      return;
    }
    setIsLoggingIn(true);
    await login(usernameOrEmail.trim(), password);
    setIsLoggingIn(false);
  };

  const handleDemoLogin = async () => {
    setIsLoggingIn(true);
    showToast('Entering aww2ww as Tania Roy (Demo Creator) ✨');
    await login('taniaroy', 'Password@123');
    setIsLoggingIn(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingAvatar(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setRegAvatar(data.url);
        showToast('Profile photo attached! 📸');
      }
    } catch {
      showToast('Photo upload failed');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !regUsername.trim()) {
      showToast('Name and username are required');
      return;
    }
    setIsSigningUp(true);
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const cleanUser = regUsername.replace(/^@/, '').trim();
    const success = await register({
      name: fullName,
      username: cleanUser,
      email: regEmail.trim(),
      password: regPassword,
      avatar: regAvatar || undefined,
    });
    setIsSigningUp(false);
    if (success) {
      setIsSignUpModalOpen(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F0F2F5] flex flex-col justify-between selection:bg-purple-200">
      {/* Top Banner Accent */}
      <div className="h-1 bg-gradient-to-r from-purple-700 via-pink-500 to-indigo-600 w-full"></div>

      {/* Main Facebook-Style 2-Column Hero Container */}
      <div className="max-w-6xl w-full mx-auto px-4 py-8 lg:py-20 flex-1 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
        
        {/* Left Column: Brand Hero & Ads / Features Highlights */}
        <div className="w-full lg:max-w-xl text-center lg:text-left space-y-5">
          {/* Brand Logo & Heart Accent */}
          <div className="inline-flex items-center space-x-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              aww2ww
            </h1>
            <span className="text-pink-500 text-3xl sm:text-4xl animate-pulse font-bold">♥</span>
          </div>

          {/* Catchy Hero Tagline matching Facebook style */}
          <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 leading-snug">
            Connect with creators, friends, and the world around you on <span className="text-purple-700 font-bold">aww2ww</span>.
          </p>

          <p className="text-sm sm:text-base text-gray-600 max-w-lg leading-relaxed">
            A next-generation creator social network with real people, verified moments, high-speed reels, and instant messenger.
          </p>

          {/* Value Proposition / Ads Highlight Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
            <div className="flex items-center space-x-3 p-3 bg-white rounded-2xl shadow-xs border border-purple-50">
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-500 shrink-0">
                <Film className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-gray-900">Watch &amp; Share Reels</h4>
                <p className="text-[11px] text-gray-500">Short video magic with high-speed streaming</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-white rounded-2xl shadow-xs border border-purple-50">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-gray-900">Instant Messenger</h4>
                <p className="text-[11px] text-gray-500">Real-time chats &amp; instant photo sharing</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-white rounded-2xl shadow-xs border border-purple-50">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-500 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-gray-900">Moments &amp; Stories</h4>
                <p className="text-[11px] text-gray-500">Share your daily life with real community</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-white rounded-2xl shadow-xs border border-purple-50">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-gray-900">Connect &amp; Discover</h4>
                <p className="text-[11px] text-gray-500">Meet friends, follow creators &amp; join communities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Facebook-Style Login Card */}
        <div className="w-full max-w-sm sm:max-w-md shrink-0 flex flex-col items-center">
          <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-6 space-y-4">
            
            <div className="text-center sm:text-left">
              <h2 className="text-lg font-black text-gray-900">Log In to aww2ww</h2>
              <p className="text-xs text-gray-500">Enter your credentials to access your dashboard</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              {/* Username / Email */}
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="text"
                  value={usernameOrEmail}
                  onChange={e => setUsernameOrEmail(e.target.value)}
                  placeholder="Email address or username"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/60 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-purple-100 transition-all"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-3 bg-gray-50/60 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-purple-100 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 text-white font-bold text-sm shadow-md shadow-purple-600/20 hover:opacity-95 active:scale-98 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isLoggingIn ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <span>Log In</span>
                )}
              </button>
            </form>

            {/* Forgotten password link */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => showToast('Enter your registered email on the login box to recover your password')}
                className="text-xs text-purple-700 hover:underline font-medium cursor-pointer"
              >
                Forgotten password?
              </button>
            </div>

            {/* Divider Line (Facebook Style) */}
            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-gray-200 w-full"></div>
            </div>

            {/* Create New Account Button (Facebook Emerald Green Style) */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUpModalOpen(true)}
                className="py-3 px-6 rounded-xl bg-[#42b72a] hover:bg-[#36a420] text-white font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer"
              >
                Create new account
              </button>
            </div>

            {/* One-click Demo Test Drive Button */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2 px-3 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100/70 text-purple-700 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
              >
                <span>⚡</span>
                <span>Instant Demo: Explore as Tania Roy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Under-Card Footnote (Facebook Style) */}
          <p className="text-xs text-gray-500 mt-5 text-center">
            <span className="font-bold text-gray-800 hover:underline cursor-pointer">Create a Page</span> for a celebrity, brand, or business.
          </p>
        </div>
      </div>

      {/* Facebook-Style Sign Up Modal */}
      {isSignUpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[95vh]">
            
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-gray-900 leading-tight">Sign Up</h3>
                <p className="text-xs text-gray-500">It's quick and easy.</p>
              </div>
              <button
                onClick={() => setIsSignUpModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleRegisterSubmit} className="p-5 overflow-y-auto space-y-3.5 text-left">
              
              {/* Profile Photo Picker */}
              <div className="flex items-center space-x-3.5 pb-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarUpload}
                  accept="image/*"
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-14 h-14 rounded-full bg-purple-50 border-2 border-dashed border-purple-300 flex items-center justify-center cursor-pointer overflow-hidden relative group shrink-0"
                  title="Click to add profile photo"
                >
                  {regAvatar ? (
                    <img src={regAvatar} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-5 h-5 text-purple-500" />
                  )}
                  {isUploadingAvatar && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-bold text-purple-700 hover:underline cursor-pointer"
                  >
                    {regAvatar ? 'Change profile photo' : 'Add profile photo'}
                  </button>
                  <p className="text-[10px] text-gray-500">JPG, PNG (Optional)</p>
                </div>
              </div>

              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-purple-600 focus:bg-white"
                  required
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  placeholder="Surname"
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-purple-600 focus:bg-white"
                />
              </div>

              {/* Username */}
              <div>
                <input
                  type="text"
                  value={regUsername}
                  onChange={e => setRegUsername(e.target.value)}
                  placeholder="Choose username (e.g. rohit_das)"
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-purple-600 focus:bg-white"
                  required
                />
              </div>

              {/* Email / Mobile */}
              <div>
                <input
                  type="email"
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  placeholder="Mobile number or email address"
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-purple-600 focus:bg-white"
                  required
                />
              </div>

              {/* New Password */}
              <div>
                <input
                  type="password"
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  placeholder="New password"
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-purple-600 focus:bg-white"
                  required
                />
              </div>

              {/* Terms of Service notice */}
              <p className="text-[10px] text-gray-500 leading-tight">
                By clicking Sign Up, you agree to aww2ww's Terms, Privacy Policy and Cookies Policy.
              </p>

              {/* Submit Button */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={isSigningUp}
                  className="w-full py-2.5 px-6 rounded-xl bg-[#42b72a] hover:bg-[#36a420] text-white font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isSigningUp ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <span>Sign Up</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Footer (Facebook Style) */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4 text-xs text-gray-500">
        <div className="max-w-6xl mx-auto space-y-2 text-center lg:text-left">
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-1 text-[11px] text-gray-600">
            <span>English (UK)</span>
            <span>বাংলা</span>
            <span>हिन्दी</span>
            <span>Español</span>
            <span>Português</span>
            <span>Français</span>
            <span>Deutsch</span>
          </div>
          <div className="border-t border-gray-100 my-2"></div>
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-1 text-[11px] text-gray-500">
            <span>Sign Up</span>
            <span>Log In</span>
            <span>Reels</span>
            <span>Messenger</span>
            <span>Stories</span>
            <span>Community</span>
            <span>Creators</span>
            <span>Help Center</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
          <p className="text-[11px] text-gray-400 pt-2 text-center lg:text-left">
            aww2ww © 2026 • Real People • Real Connections
          </p>
        </div>
      </footer>
    </div>
  );
};
