import React, { useEffect, useState } from 'react';
import LoginPopup from './components/LoginPopup';
import AgentApplyPopup from './components/AgentApplyPopup';
import PartnerAdsPopup from './components/PartnerAdsPopup';

interface AppProps {
  initialIsMobile?: boolean;
}

const App: React.FC<AppProps> = ({ initialIsMobile }) => {
  const [isLoading, setIsLoading] = useState(true);
  const MOBILE_URL = 'https://h5.agent4u.cc';
  // 只有手机端（宽度 ≤ 480px）才显示 iframe，iPad 和 PC 显示提示页
  const MOBILE_QUERY = '(max-width: 480px)';

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof initialIsMobile === 'boolean') {
      return initialIsMobile;
    }
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false;
    }
    return window.matchMedia(MOBILE_QUERY).matches;
  });

  useEffect(() => {
    if (!window.matchMedia) {
      return;
    }
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const iframeUrl = MOBILE_URL;
  const containerClassName = 'app-shell bg-transparent overflow-hidden';
  const iframeSandbox = isMobile
    ? 'allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads allow-storage-access-by-user-activation'
    : undefined;

  useEffect(() => {
    setIsLoading(true);
  }, [iframeUrl]);

  useEffect(() => {
    if (!isMobile) {
      setIsLoading(false);
    }
  }, [isMobile]);

  return (
    <div className={containerClassName}>
      <LoginPopup />
      <AgentApplyPopup />
      <PartnerAdsPopup />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-transparent">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-blue-200/50 text-xs font-medium tracking-widest uppercase animate-pulse">
              Connecting to WinboxAgent
            </p>
          </div>
        </div>
      )}

      {!isMobile && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#f5f5f5] p-6">
          <div
            className="w-full max-w-[480px] rounded-[4px] bg-white p-8 border border-gray-100"
            style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Segoe UI,Arial,Roboto,'PingFang SC',miui,'Hiragino Sans GB','Microsoft Yahei',sans-serif" }}
          >
            <h2 className="text-base font-bold text-[#323233] mb-1">请用手机访问此页面</h2>
            <p className="text-[#969799] text-xs mb-6">以获得Winbox赢宝股东网Agent4u最佳体验</p>

            <div className="bg-[#edfcff] border border-[#1278b6] rounded-[4px] p-4 mb-6 text-left">
              <p className="text-sm text-[#323233] leading-relaxed mb-4">
                当前仅支持手机端使用。如需登录股东后台，请使用手机浏览器访问Winbox股东/agent后台。
              </p>
              <div className="space-y-3">
                <div className="bg-white rounded-[4px] p-3 border border-gray-100">
                  <p className="text-xs text-[#969799] mb-1">玩家注册</p>
                  <a href="https://register.winboxmalay.com" className="text-sm font-medium text-[#1278b6] hover:underline break-all block">
                    https://register.winboxmalay.com
                  </a>
                </div>
                <div className="bg-white rounded-[4px] p-3 border border-gray-100">
                  <p className="text-xs text-[#969799] mb-1">玩家登录</p>
                  <a href="https://login.winboxmalay.com" className="text-sm font-medium text-[#1278b6] hover:underline break-all block">
                    https://login.winboxmalay.com
                  </a>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#969799] mb-4">任何关于加入Winbox股东/Agent/玩家账户注册登陆的问题，请联系官方Telegram客服。</p>
            <a
              href="https://t.me/wbxmalay"
              className="inline-flex items-center justify-center w-full h-[40px] rounded-[4px] text-white text-sm font-medium transition-colors"
              style={{ backgroundColor: '#208bca' }}
            >
              联系官方客服 @wbxmalay
            </a>
          </div>
        </div>
      )}
      
      {isMobile && (
        <iframe
          src={iframeUrl}
          className="app-iframe"
          onLoad={() => setIsLoading(false)}
          title="Agent4U"
          allow="camera; microphone; geolocation; clipboard-read; clipboard-write; autoplay; fullscreen; storage-access-by-user-activation; top-navigation-by-user-activation; top-navigation"
          sandbox={iframeSandbox}
        />
      )}

      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <a
          href="https://winboxmalay.com"
          target="_blank"
          rel="noreferrer"
          className={`text-xs text-slate-500 hover:text-slate-700 pointer-events-auto ${
            isMobile ? 'sr-only' : ''
          }`}
        >
          winboxmalay.com
        </a>
      </div>

    </div>
  );
};

export default App;
