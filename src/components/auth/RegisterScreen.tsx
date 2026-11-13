import React, { useState } from 'react';
import { ArrowLeft, Camera, Plus, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RegisterScreen: React.FC = () => {
  const { setAuthScreen, register, login, setActiveTab, showToast, t } = useApp();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingAvatar(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setAvatarUrl(data.url);
        showToast('Profile photo uploaded! 📸');
      }
    } catch {
      showToast('Photo upload failed');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast('Passwords do not match');
      return;
    }
    if (!agreed) {
      showToast('Please agree to Terms of Service');
      return;
    }
    setIsSubmitting(true);
    const fullName = `${firstName} ${lastName}`.trim() || 'New User';
    const cleanUser = username.replace(/^@/, '').trim() || `user_${Date.now()}`;
    await register({
      name: fullName,
      username: cleanUser,
      email,
      password,
      avatar: avatarUrl || undefined,
    });
    setIsSubmitting(false);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-purple-700 via-purple-600 to-pink-500 flex flex-col justify-between text-white select-none">
      {/* Top Banner with Back Arrow matching Screenshot 2 */}
      <div className="pt-2 pb-2 px-4 flex flex-col items-center relative text-center shrink-0">
        <button
          onClick={() => setActiveTab('home')}
          className="absolute left-3 top-3 p-1 text-white hover:text-purple-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-1.5 mt-0.5">
          <span className="text-xl font-black tracking-tight text-white">aww2ww</span>
          <span className="text-pink-300 text-lg font-bold">♥</span>
        </div>
        <h1 className="text-sm font-extrabold mt-0.5 text-white">{t.createAccount}</h1>
        <p className="text-[10px] text-purple-100 max-w-xs">{t.signupSubtitle}</p>

        {/* Circular Avatar Upload Circle with Pink Plus Badge */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleAvatarChange}
          accept="image/*"
          className="hidden"
        />
        <div 
          onClick={() => fileInputRef.current?.click()} 
          className="mt-2 relative group cursor-pointer"
          title="Click to select profile photo"
        >
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/60 flex flex-col items-center justify-center text-white shadow-md hover:bg-white/30 overflow-hidden transition-all">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : isUploadingAvatar ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Camera className="w-5 h-5 text-white" />
                <span className="text-[8px] font-medium mt-0.2 text-white/90">Add Photo</span>
              </>
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-4.5 h-4.5 rounded-full bg-pink-500 text-white flex items-center justify-center border border-white shadow-sm">
            <Plus className="w-3 h-3 stroke-[3]" />
          </div>
        </div>
      </div>

      {/* White Form Card matching Screenshot 2 */}
      <div className="bg-white text-gray-900 rounded-t-3xl shadow-2xl p-4 flex flex-col flex-1 justify-between">
        <form onSubmit={handleSignUp} className="space-y-2 text-left">
          {/* First Name & Last Name (2 cols) */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full px-3 py-1.5 bg-gray-50 border border-purple-100 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full px-3 py-1.5 bg-gray-50 border border-purple-100 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username (@...)"
              className="w-full px-3 py-1.5 bg-gray-50 border border-purple-100 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          {/* Email or Phone */}
          <div>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email or Phone Number"
              className="w-full px-3 py-1.5 bg-gray-50 border border-purple-100 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-3 pr-8 py-1.5 bg-gray-50 border border-purple-100 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-purple-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 top-2 text-gray-400"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full pl-3 pr-8 py-1.5 bg-gray-50 border border-purple-100 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          {/* Terms checkbox */}
          <div className="flex items-center space-x-2 pt-0.5">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="w-3.5 h-3.5 text-purple-600 rounded-xs border-purple-300 focus:ring-purple-400"
            />
            <label htmlFor="terms" className="text-[10px] text-gray-500">
              I agree to the <span className="text-purple-600 font-semibold">Terms of Service</span> and{' '}
              <span className="text-purple-600 font-semibold">Privacy Policy</span>
            </label>
          </div>

          {/* Sign Up Button matching Screenshot 2 gradient */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500 text-white font-bold text-xs shadow-md shadow-purple-600/25 hover:opacity-95 active:scale-98 transition-all mt-1 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating Profile...</span>
              </>
            ) : (
              <span>{t.signUp}</span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-2 flex items-center justify-center">
          <div className="border-t border-gray-100 w-full"></div>
          <span className="bg-white px-2.5 text-[9px] text-gray-400 absolute">
            {t.orContinueWith}
          </span>
        </div>

        {/* Social login buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => login()}
            className="py-1 px-2 border border-purple-100 rounded-xl flex items-center justify-center space-x-1 hover:bg-purple-50/50"
          >
            <span className="text-xs font-bold text-amber-500">G</span>
            <span className="text-[10px] font-semibold text-gray-700">Google</span>
          </button>
          <button
            onClick={() => login()}
            className="py-1 px-2 border border-purple-100 rounded-xl flex items-center justify-center space-x-1 hover:bg-purple-50/50"
          >
            <span className="text-xs font-bold text-blue-600">f</span>
            <span className="text-[10px] font-semibold text-gray-700">Facebook</span>
          </button>
          <button
            onClick={() => login()}
            className="py-1 px-2 border border-purple-100 rounded-xl flex items-center justify-center space-x-1 hover:bg-purple-50/50"
          >
            <span className="text-xs font-bold text-gray-900"></span>
            <span className="text-[10px] font-semibold text-gray-700">Apple</span>
          </button>
        </div>

        {/* Already have an account */}
        <div className="mt-2 text-center">
          <span className="text-[10px] text-gray-500">Already have an account? </span>
          <button
            onClick={() => setAuthScreen('login')}
            className="text-[10px] font-bold text-purple-700 hover:underline"
          >
            {t.login}
          </button>
        </div>
      </div>
    </div>
  );
};
