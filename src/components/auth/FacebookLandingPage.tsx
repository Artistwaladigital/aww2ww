import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Film, MessageCircle, Sparkles, Users, Camera, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { API_URL } from '../../api/client';

export const FacebookLandingPage: React.FC = () => {
  const { login, register, showToast } = useApp();

  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Sign Up Form State
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
    if (!success) {
      showToast('Registration failed. Please try a different username or email.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F0F2F5] flex flex-col justify-between selection:bg-purple-200 pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]">
      {/* Top Banner Accent */}
      <div className="h-1 bg-gradient-to-r from-purple-700 via-pink-500 to-indigo-600 w-full"></div>

      {/* Main Container */}
      <div className="max-w-6xl w-full mx-auto px-4 py-6 lg:py-16 flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-14">
        
        {/* Left Column on Desktop / Hidden or Below on Mobile */}
        <div className="hidden lg:block w-full lg:max-w-xl text-left space-y-5">
          {/* Brand Logo & Heart Accent */}
          <div className="inline-flex items-center space-x-2">
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              aww2ww
            </h1>
            <span className="text-pink-500 text-4xl animate-pulse font-bold">♥</span>
          </div>

          <p className="text-2xl lg:text-3xl font-semibold text-gray-800 leading-snug">
            Connect with creators, friends, and the world around you on <span className="text-purple-700 font-bold">aww2ww</span>.
          </p>

          <p className="text-base text-gray-600 max-w-lg leading-relaxed">
            A next-generation creator social network with real people, verified moments, high-speed reels, and instant messenger.
          </p>

          {/* Desktop Feature Highlights */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <div className="flex items-center space-x-3 p-3 bg-white rounded-2xl shadow-xs border border-purple-50">
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-500 shrink-0">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Watch &amp; Share Reels</h4>
                <p className="text-[11px] text-gray-500">Short video magic with high-speed streaming</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-white rounded-2xl shadow-xs border border-purple-50">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Instant Messenger</h4>
                <p className="text-[11px] text-gray-500">Real-time chats &amp; instant photo sharing</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-white rounded-2xl shadow-xs border border-purple-50">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-500 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Moments &amp; Stories</h4>
                <p className="text-[11px] text-gray-500">Share your daily life with real community</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-white rounded-2xl shadow-xs border border-purple-50">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Connect &amp; Discover</h4>
                <p className="text-[11px] text-gray-500">Meet friends, follow creators &amp; join hubs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column / Primary Mobile Authentication Card */}
        <div className="w-full max-w-sm sm:max-w-md shrink-0 flex flex-col items-center">
          
          {/* Mobile Brand Header */}
          <div className="flex flex-col items-center text-center mb-4 lg:hidden">
            <div className="inline-flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                aww2ww
              </h1>
              <span className="text-pink-500 text-2xl font-bold">♥</span>
            </div>
            <p className="text-xs font-semibold text-purple-700 mt-0.5 tracking-wide">
              Real People • Real Connections
            </p>
          </div>

          <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-5 sm:p-6 space-y-4">
            
            {/* Segmented Tab Switcher (Log In vs Create Account) */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setAuthTab('login')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  authTab === 'login'
                    ? 'bg-white text-purple-700 shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthTab('signup')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  authTab === 'signup'
                    ? 'bg-white text-purple-700 shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create Account</span>
              </button>
            </div>

            {/* TAB 1: LOG IN FORM */}
            {authTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-3.5 animate-fadeIn">
                <div className="text-center sm:text-left">
                  <h2 className="text-base font-bold text-gray-900">Welcome Back</h2>
                  <p className="text-xs text-gray-500">Enter your credentials to access your feed</p>
                </div>

                {/* Username / Email */}
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={usernameOrEmail}
                    onChange={e => setUsernameOrEmail(e.target.value)}
                    placeholder="Email address or username"
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-purple-100 transition-all"
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
                    className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-purple-100 transition-all"
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
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-600/20 hover:opacity-95 active:scale-98 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
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

                {/* One-click Demo Test Drive Button */}
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full py-2.5 px-3 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100/70 text-purple-700 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                >
                  <span>⚡</span>
                  <span>Instant Demo: Explore as Tania Roy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Switch to Sign Up */}
                <div className="text-center pt-1 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Don't have an account?{' '}
                    <span 
                      onClick={() => setAuthTab('signup')}
                      className="text-purple-700 font-bold hover:underline cursor-pointer"
                    >
                      Sign Up free
                    </span>
                  </p>
                </div>
              </form>
            )}

            {/* TAB 2: SIGN UP / REGISTER FORM */}
            {authTab === 'signup' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3 animate-fadeIn text-left">
                <div className="text-center sm:text-left">
                  <h2 className="text-base font-bold text-gray-900">Create an Account</h2>
                  <p className="text-xs text-gray-500">Join the real creators community on aww2ww</p>
                </div>

                {/* Profile Photo Picker (Optional) */}
                <div className="flex items-center space-x-3 py-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-12 h-12 rounded-full border-2 border-dashed border-purple-300 hover:border-purple-600 flex items-center justify-center bg-purple-50/50 cursor-pointer overflow-hidden shrink-0 transition-colors"
                  >
                    {regAvatar ? (
                      <img src={regAvatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <span 
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-bold text-purple-700 hover:underline cursor-pointer block"
                    >
                      {regAvatar ? 'Change profile photo' : 'Add profile photo'}
                    </span>
                    <span className="text-[10px] text-gray-400">Optional • JPG, PNG</span>
                  </div>
                </div>

                {/* Name fields */}
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full px-3 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
                    required
                  />
                  <input
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Surname"
                    className="w-full px-3 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
                  />
                </div>

                {/* Username */}
                <input
                  type="text"
                  value={regUsername}
                  onChange={e => setRegUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  placeholder="Choose username (e.g. rohit_das)"
                  className="w-full px-3 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
                  required
                />

                {/* Email */}
                <input
                  type="email"
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full px-3 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
                  required
                />

                {/* Password */}
                <input
                  type="password"
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  placeholder="New password (min 6 characters)"
                  className="w-full px-3 py-2.5 bg-gray-50/70 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-all"
                  required
                />

                {/* Legal Policy Notice */}
                <p className="text-[10px] text-gray-500 leading-tight">
                  By clicking Sign Up, you agree to aww2ww's{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-purple-600 font-semibold hover:underline">Terms of Service</a>,{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 font-semibold hover:underline">Privacy Policy</a> and{' '}
                  <a href="/privacy#cookies" target="_blank" rel="noopener noreferrer" className="text-purple-600 font-semibold hover:underline">Cookies Policy</a>.
                </p>

                {/* Submit Register Button */}
                <button
                  type="submit"
                  disabled={isSigningUp || isUploadingAvatar}
                  className="w-full py-3 rounded-xl bg-[#42b72a] hover:bg-[#36a420] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
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

                {/* Switch to Log In */}
                <div className="text-center pt-1 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Already have an account?{' '}
                    <span 
                      onClick={() => setAuthTab('login')}
                      className="text-purple-700 font-bold hover:underline cursor-pointer"
                    >
                      Log In
                    </span>
                  </p>
                </div>
              </form>
            )}

          </div>

          {/* Mobile Feature Highlights Accordion / Badges */}
          <div className="w-full mt-6 space-y-2 lg:hidden">
            <div className="text-center mb-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Why Join aww2ww?
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-left">
              <div className="p-2.5 bg-white rounded-xl border border-gray-100 shadow-2xs">
                <span className="text-rose-500 text-xs font-bold block">🎬 HD Reels</span>
                <span className="text-[10px] text-gray-500">Superfast video streaming</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-gray-100 shadow-2xs">
                <span className="text-purple-600 text-xs font-bold block">💬 1-on-1 Chat</span>
                <span className="text-[10px] text-gray-500">Private &amp; spam-free</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-gray-100 shadow-2xs">
                <span className="text-amber-500 text-xs font-bold block">✨ Stories</span>
                <span className="text-[10px] text-gray-500">Daily photo moments</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-gray-100 shadow-2xs">
                <span className="text-indigo-600 text-xs font-bold block">👥 Real Friends</span>
                <span className="text-[10px] text-gray-500">Verified creators</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-4 text-xs text-gray-500">
        <div className="max-w-6xl mx-auto space-y-2 text-center lg:text-left">
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-1 text-[11px] text-gray-600">
            <span>English (UK)</span>
            <span>বাংলা</span>
            <span>हिन्दी</span>
            <span>Español</span>
            <span>Português</span>
            <span>Français</span>
          </div>
          <div className="border-t border-gray-100 my-1"></div>
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-1 text-[11px] text-gray-500">
            <span className="cursor-pointer hover:underline" onClick={() => setAuthTab('signup')}>Sign Up</span>
            <span className="cursor-pointer hover:underline" onClick={() => setAuthTab('login')}>Log In</span>
            <span className="cursor-pointer hover:underline">Reels</span>
            <span className="cursor-pointer hover:underline">Messenger</span>
            <span className="cursor-pointer hover:underline">Community</span>
            <a href="/privacy" className="hover:underline text-gray-600 font-medium">Privacy Policy</a>
            <a href="/terms" className="hover:underline text-gray-600 font-medium">Terms</a>
            <a href="/data-deletion" className="hover:underline text-gray-600 font-medium">Data Deletion</a>
          </div>
          <p className="text-[11px] text-gray-400 pt-1 text-center lg:text-left">
            aww2ww © 2026 • Real People • Real Connections
          </p>
        </div>
      </footer>
    </div>
  );
};
