
import React, { useState } from 'react';
import { DeviceView } from '../types';

interface IFrameContainerProps {
  url: string;
  view: DeviceView;
}

const IFrameContainer: React.FC<IFrameContainerProps> = ({ url, view }) => {
  const [isLoading, setIsLoading] = useState(true);

  const getContainerStyles = () => {
    switch (view) {
      case DeviceView.MOBILE:
        return "w-[375px] h-[667px] rounded-[3rem] border-[12px] border-slate-900 shadow-2xl overflow-hidden relative";
      case DeviceView.TABLET:
        return "w-[768px] h-[1024px] rounded-[2rem] border-[12px] border-slate-900 shadow-2xl overflow-hidden relative";
      case DeviceView.DESKTOP:
        return "w-[1280px] h-[800px] rounded-xl border-[8px] border-slate-900 shadow-2xl overflow-hidden relative";
      case DeviceView.FULL:
        return "w-full h-full rounded-none border-none";
      default:
        return "w-full h-full";
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden bg-slate-950">
      <div className={`transition-all duration-500 ease-in-out relative ${getContainerStyles()}`}>
        {isLoading && (
          <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center z-10">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-blue-200 text-sm animate-pulse">Initializing Agent Interface...</p>
          </div>
        )}
        
        {/* Mock phone status bar for mobile/tablet */}
        {(view === DeviceView.MOBILE || view === DeviceView.TABLET) && (
            <div className="absolute top-0 w-full h-7 bg-transparent z-20 flex justify-between px-8 items-center pointer-events-none">
                <span className="text-[10px] font-bold text-black/40">9:41</span>
                <div className="flex gap-1.5 items-center">
                    <div className="w-3 h-3 rounded-full border border-black/20"></div>
                    <div className="w-3 h-3 rounded-full border border-black/20"></div>
                </div>
            </div>
        )}

        <iframe
          src={url}
          className="w-full h-full bg-white"
          onLoad={() => setIsLoading(false)}
          title="Agent4U"
          allow="camera; microphone; geolocation"
        />
      </div>
    </div>
  );
};

export default IFrameContainer;
