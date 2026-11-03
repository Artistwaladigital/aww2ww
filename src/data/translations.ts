export type Language = 'en' | 'bn' | 'banglish';

export interface Translations {
  appName: string;
  tagline: string;
  home: string;
  friends: string;
  reels: string;
  groups: string;
  menu: string;
  watch: string;
  marketplace: string;
  profile: string;
  createStory: string;
  whatsOnYourMind: string;
  live: string;
  photo: string;
  feeling: string;
  like: string;
  comment: string;
  send: string;
  share: string;
  messages: string;
  searchMessages: string;
  all: string;
  unread: string;
  requests: string;
  trendingReels: string;
  createReel: string;
  follow: string;
  following: string;
  message: string;
  posts: string;
  tagged: string;
  welcomeBack: string;
  loginSubtitle: string;
  createAccount: string;
  signupSubtitle: string;
  login: string;
  signUp: string;
  forgotPassword: string;
  orContinueWith: string;
  haveAccount: string;
  dontHaveAccount: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'aww2ww',
    tagline: 'Real People • Real Vibes',
    home: 'Home',
    friends: 'Friends',
    reels: 'Reels',
    groups: 'Groups',
    menu: 'Menu',
    watch: 'Watch',
    marketplace: 'Marketplace',
    profile: 'Profile',
    createStory: 'Create Story',
    whatsOnYourMind: "What's on your mind, Tania? ✨",
    live: 'Live',
    photo: 'Photo',
    feeling: 'Feeling',
    like: 'Like',
    comment: 'Comment',
    send: 'Send',
    share: 'Share',
    messages: 'Messages',
    searchMessages: 'Search messages',
    all: 'All',
    unread: 'Unread',
    requests: 'Requests',
    trendingReels: 'Trending Reels 🔥',
    createReel: 'Create Reel',
    follow: 'Follow',
    following: 'Following',
    message: 'Message',
    posts: 'Posts',
    tagged: 'Tagged',
    welcomeBack: 'Welcome Back! 👋',
    loginSubtitle: 'Login to continue to your account',
    createAccount: 'Create Account',
    signupSubtitle: 'Join aww2ww and be a part of our community',
    login: 'Login',
    signUp: 'Sign Up',
    forgotPassword: 'Forgot Password?',
    orContinueWith: 'or continue with',
    haveAccount: 'Already have an account? Login',
    dontHaveAccount: "Don't have an account? Sign Up",
  },
  bn: {
    appName: 'aww2ww',
    tagline: 'আসল মানুষ • আসল অনুভূতি',
    home: 'হোম',
    friends: 'বন্ধুরা',
    reels: 'রিলস',
    groups: 'গ্রুপ',
    menu: 'মেনু',
    watch: 'ওয়াচ',
    marketplace: 'মার্কেটপ্লেস',
    profile: 'প্রোফাইল',
    createStory: 'স্টোরি বানান',
    whatsOnYourMind: 'তানিয়া, তোমার মনে কি চলছে? ✨',
    live: 'লাইভ',
    photo: 'ছবি',
    feeling: 'অনুভূতি',
    like: 'পছন্দ',
    comment: 'মন্তব্য',
    send: 'পাঠান',
    share: 'শেয়ার',
    messages: 'মেসেজ',
    searchMessages: 'মেসেজ খুঁজুন',
    all: 'সব',
    unread: 'না পড়া',
    requests: 'অনুরোধ',
    trendingReels: 'ট্রেন্ডিং রিলস 🔥',
    createReel: 'রিল তৈরি করুন',
    follow: 'ফলো করুন',
    following: 'ফলো করছেন',
    message: 'মেসেজ',
    posts: 'পোস্ট',
    tagged: 'ট্যাগ করা',
    welcomeBack: 'স্বাগতম! 👋',
    loginSubtitle: 'আপনার অ্যাকাউন্টে প্রবেশ করুন',
    createAccount: 'নতুন অ্যাকাউন্ট তৈরি করুন',
    signupSubtitle: 'aww2ww এর পরিবারের অংশ হোন',
    login: 'লগইন',
    signUp: 'সাইন আপ',
    forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
    orContinueWith: 'বা মাধ্যম নির্বাচন করুন',
    haveAccount: 'অ্যাকাউন্ট আছে? লগইন করুন',
    dontHaveAccount: 'অ্যাকাউন্ট নেই? সাইন আপ করুন',
  },
  banglish: {
    appName: 'aww2ww',
    tagline: 'Real People • Real Vibes',
    home: 'Home',
    friends: 'Friends',
    reels: 'Reels',
    groups: 'Groups',
    menu: 'Menu',
    watch: 'Watch',
    marketplace: 'Marketplace',
    profile: 'Profile',
    createStory: 'Story Banao',
    whatsOnYourMind: "Ki cholche moner moddhe, Tania? ✨",
    live: 'Live',
    photo: 'Photo',
    feeling: 'Feeling',
    like: 'Like',
    comment: 'Comment',
    send: 'Send',
    share: 'Share',
    messages: 'Messages',
    searchMessages: 'Message khujun',
    all: 'Sob',
    unread: 'Unread',
    requests: 'Requests',
    trendingReels: 'Trending Reels 🔥',
    createReel: 'Reel Banao',
    follow: 'Follow',
    following: 'Following',
    message: 'Message',
    posts: 'Posts',
    tagged: 'Tagged',
    welcomeBack: 'Welcome Back! 👋',
    loginSubtitle: 'Login kore continue koro',
    createAccount: 'Account Banao',
    signupSubtitle: 'aww2ww community-te join koro',
    login: 'Login',
    signUp: 'Sign Up',
    forgotPassword: 'Password mone nei?',
    orContinueWith: 'or continue with',
    haveAccount: 'Account ache? Login koro',
    dontHaveAccount: 'Account nei? Sign Up koro',
  },
};
