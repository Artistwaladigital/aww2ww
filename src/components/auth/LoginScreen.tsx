import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { Language } from '../../data/translations';

export const LoginScreen: React.FC = () => {
  const { setAuthScreen, login, setActiveTab, language, setLanguage, t } = useApp();
  const [email, setEmail] = useState('taniaroy@aww2ww.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  const languages: { id: Language; label: string }[] = [
    { id: 'en', label: 'English' },
    { id: 'bn', label: 'বাংলা (Bengali)' },
    { id: 'banglish', label: 'Banglish' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FBF9FE] flex flex-col justify-between select-none">
      {/* Top Bar with Back Arrow and Language Selector */}
      <div className="px-4 pt-3 flex items-center justify-between z-20">
        <button
          onClick={() => setActiveTab('home')}
          className="p-1 text-gray-700 hover:text-purple-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Language dropdown matching Screenshot 2 */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center space-x-1 text-xs font-semibold text-gray-700 bg-white border border-purple-100 px-3 py-1.5 rounded-full shadow-2xs hover:bg-purple-50 transition-colors"
          >
            <span>
              {language === 'bn' ? 'বাংলা' : language === 'banglish' ? 'Banglish' : 'English'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-1 w-36 bg-white border border-purple-100 rounded-2xl shadow-xl p-1 z-30 animate-fadeIn text-left">
              {languages.map(l => (
                <button
                  key={l.id}
                  onClick={() => {
                    setLanguage(l.id);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                    language === l.id ? 'bg-purple-50 text-purple-700 font-bold' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Brand & Illustration matching Screenshot 2 */}
      <div className="pt-1 px-4 flex flex-col items-center text-center shrink-0">
        <div className="flex items-center space-x-1.5">
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            aww2ww
          </span>
          <span className="text-pink-500 text-xl font-bold">♥</span>
        </div>
        <span className="text-[11px] font-medium text-purple-500 tracking-wide font-serif italic">
          Connect. Share. Inspire. 💜
        </span>

        {/* Cute Illustrated Banner matching Screenshot 2 */}
        <div className="relative w-full max-w-[280px] h-28 my-1.5 flex items-center justify-center">
          {/* Floating cute social bubbles */}
          <div className="absolute top-1 left-4 bg-purple-600 text-white text-[9px] px-2 py-0.5 rounded-full shadow-md animate-bounce">
            ♥
          </div>
          <div className="absolute top-2 right-6 bg-pink-500 text-white text-[9px] px-2 py-0.5 rounded-full shadow-md animate-pulse">
            💬
          </div>
          <div className="absolute bottom-2 right-4 bg-purple-500 text-white text-[9px] px-2 py-0.5 rounded-full shadow-md">
            👥
          </div>

          {/* Social friends illustration graphic */}
          <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-tr from-purple-100 via-pink-50 to-indigo-50 border border-purple-100 shadow-inner flex items-center justify-center p-1.5">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80"
              alt="Friends connecting"
              className="w-full h-full object-cover rounded-xl opacity-90 mix-blend-multiply"
            />
          </div>
        </div>
      </div>

      {/* White Bottom Sheet Card matching Screenshot 2 */}
      <div className="bg-white rounded-t-3xl shadow-[0_-10px_30px_rgba(124,58,237,0.06)] border-t border-purple-100 p-4.5 flex flex-col flex-1 justify-between">
        <div className="text-left mb-2">
          <h2 className="text-base font-black text-gray-900">{t.welcomeBack}</h2>
          <p className="text-[11px] text-gray-500">{t.loginSubtitle}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-2 text-left">
          {/* Email or Phone Input */}
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email or Phone Number"
              className="w-full pl-9 pr-4 py-2 bg-gray-50/80 border border-purple-100 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-purple-500 focus:bg-white transition-all"
            />
          </div>

          {/* Password Input with eye toggle */}
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-9 pr-9 py-2 bg-gray-50/80 border border-purple-100 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-purple-500 focus:bg-white transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <button
              type="button"
              className="text-[10px] font-semibold text-purple-600 hover:text-purple-700"
            >
              {t.forgotPassword}
            </button>
          </div>

          {/* Login Button matching Screenshot 2 gradient */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 text-white font-bold text-xs shadow-md shadow-purple-600/25 hover:opacity-95 active:scale-98 transition-all"
          >
            {t.login}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-2.5 flex items-center justify-center">
          <div className="border-t border-gray-100 w-full"></div>
          <span className="bg-white px-2.5 text-[10px] text-gray-400 absolute">
            {t.orContinueWith}
          </span>
        </div>

        {/* Social Login Buttons matching Screenshot 2 (Google, Facebook, Apple) */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={login}
            className="py-1.5 px-2 border border-purple-100 rounded-xl flex items-center justify-center space-x-1 hover:bg-purple-50/50 transition-colors"
          >
            <span className="text-xs font-bold text-amber-500">G</span>
            <span className="text-[11px] font-semibold text-gray-700">Google</span>
          </button>

          <button
            onClick={login}
            className="py-1.5 px-2 border border-purple-100 rounded-xl flex items-center justify-center space-x-1 hover:bg-purple-50/50 transition-colors"
          >
            <span className="text-xs font-bold text-blue-600">f</span>
            <span className="text-[11px] font-semibold text-gray-700">Facebook</span>
          </button>

          <button
            onClick={login}
            className="py-1.5 px-2 border border-purple-100 rounded-xl flex items-center justify-center space-x-1 hover:bg-purple-50/50 transition-colors"
          >
            <span className="text-xs font-bold text-gray-900"></span>
            <span className="text-[11px] font-semibold text-gray-700">Apple</span>
          </button>
        </div>

        {/* Don't have an account switch */}
        <div className="mt-2 text-center">
          <span className="text-[11px] text-gray-500">Don't have an account? </span>
          <button
            onClick={() => setAuthScreen('signup')}
            className="text-[11px] font-bold text-purple-700 hover:underline"
          >
            {t.signUp}
          </button>
        </div>
      </div>
    </div>
  );
};
