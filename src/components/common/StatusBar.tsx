import React from 'react';
import { Wifi } from 'lucide-react';

export const StatusBar: React.FC = () => {
  return (
    <div className="w-full h-11 px-6 flex items-center justify-between text-xs font-semibold text-gray-800 select-none z-30 shrink-0">
      <span className="tracking-tight text-[13px] font-medium">9:41</span>
      
      {/* Dynamic Island pill */}
      <div className="w-24 h-5 bg-black rounded-full mx-auto -mt-1 shadow-inner flex items-center justify-end px-2 space-x-1">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse"></div>
      </div>

      <div className="flex items-center space-x-1.5 text-gray-800">
        {/* Signal Bars */}
        <div className="flex items-end space-x-0.5 h-3">
          <div className="w-0.5 h-1 bg-gray-800 rounded-sm"></div>
          <div className="w-0.5 h-1.5 bg-gray-800 rounded-sm"></div>
          <div className="w-0.5 h-2 bg-gray-800 rounded-sm"></div>
          <div className="w-0.5 h-2.5 bg-gray-800 rounded-sm"></div>
        </div>
        <Wifi className="w-3.5 h-3.5" />
        {/* Battery */}
        <div className="w-5 h-2.5 border border-gray-800 rounded-sm p-0.5 flex items-center">
          <div className="w-full h-full bg-gray-800 rounded-2xs"></div>
        </div>
      </div>
    </div>
  );
};
