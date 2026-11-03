import React from 'react';
import { Store, Tag, Search, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TopTabs } from '../common/TopTabs';

export const MarketplaceView: React.FC = () => {
  const { showToast } = useApp();

  const products = [
    {
      id: 'p1',
      title: 'Sony Alpha 4K Vlogging Camera Kit',
      price: '₹54,999',
      location: 'Park Street, Kolkata',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
      badge: 'Featured',
    },
    {
      id: 'p2',
      title: 'Studio Softbox LED Lighting Set',
      price: '₹3,499',
      location: 'Salt Lake, Kolkata',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'p3',
      title: 'Acoustic Studio Microphone & Boom Arm',
      price: '₹6,800',
      location: 'New Town, Kolkata',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'p4',
      title: 'Handmade Bengal Jamdani Designer Dress',
      price: '₹4,200',
      location: 'Gariahat, Kolkata',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
      badge: 'Popular',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 pb-20 select-none">
      <TopTabs />

      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-purple-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Store className="w-5 h-5 text-purple-700" />
          <h1 className="text-base font-extrabold text-gray-900">Marketplace</h1>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={() => showToast('Create Listing')}
            className="flex items-center space-x-1 bg-purple-700 text-white font-bold px-3 py-1.5 rounded-full shadow-2xs hover:bg-purple-800"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Sell</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-3 bg-white border-b border-gray-100">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search items, creator equipment, fashion..."
            className="w-full bg-purple-50/60 pl-9 pr-4 py-2 text-xs rounded-full border border-purple-100 focus:outline-none focus:border-purple-400"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-3 grid grid-cols-2 gap-2.5">
        {products.map(p => (
          <div
            key={p.id}
            onClick={() => showToast(`View ${p.title}`)}
            className="bg-white rounded-2xl overflow-hidden shadow-2xs border border-purple-50 text-left cursor-pointer group hover:shadow-xs transition-shadow"
          >
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {p.badge && (
                <span className="absolute top-2 left-2 bg-purple-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                  {p.badge}
                </span>
              )}
              <button
                onClick={e => {
                  e.stopPropagation();
                  showToast('Saved to wishlist ❤️');
                }}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-pink-600 transition-colors shadow-2xs backdrop-blur-xs"
              >
                <Heart className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-2.5">
              <span className="font-extrabold text-sm text-gray-900 block">{p.price}</span>
              <h2 className="text-xs text-gray-700 font-medium line-clamp-1 mt-0.5">{p.title}</h2>
              <span className="text-[10px] text-gray-400 mt-1 block">{p.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
