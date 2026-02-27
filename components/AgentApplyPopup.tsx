import React, { useState, useEffect } from 'react';
import { POPUP_CONFIG } from '../popup.config';
import nicknameIcon from '../nickname.svg';

const ASSETS = {
  logo: 'https://asset.wkapi.cc//brand/TGT/150x150.svg',
  userIcon: 'https://asset.wkapi.cc/static/TGT/CommonView/LoginRegist/wb_Uid.svg',
  passwordIcon: 'https://asset.wkapi.cc/static/TGT/CommonView/LoginRegist/wb_login_password.svg',
  nicknameIcon,
};

type Language = 'en' | 'zh' | 'ms';

const TRANSLATIONS = {
  en: {
    title: 'Winbox Official Shareholder & Agent Recruitment',
    subtitle: 'Until 3 Mar 2026 (Lantern Festival). Apply directly with official backing—transparent commission, secure rights. Join before the deadline for the New Year Ang Pao up to 1,000 MYR.',
    earnCommission: 'Limited-Time Incentive',
    commissionRate: 'New Year Ang Pao up to 1,000 MYR',
    description: 'Seize the last bonus window before the Lantern Festival and start your global earning journey.',
    redPacketDisclaimer: 'Note: Red packets are prioritised for shareholders with higher activity.',
    joinNow: 'Agent Sign Up',
    alreadyMember: 'Agent Login',
    agentApplication: 'Apply Now — Winbox Shareholder & Agent',
    fillDetails: 'Fill in your details to start',
    nickname: 'Nickname',
    nicknamePlaceholder: 'Your nickname',
    uid: 'UID',
    uidPlaceholder: 'Winbox UID',
    uidPrefixError: 'UID cannot start with win or wb',
    uidRuleError: 'UID must include both letters and numbers',
    uidFirstCharError: 'The first character cannot be a number',
    uidMinLengthError: 'UID must be at least 6 characters',
    uidContainsC8Error: 'UID cannot contain c8',
    password: 'Password',
    passwordPlaceholder: 'Set password',
    confirmPassword: 'Confirm Password',
    confirmPasswordPlaceholder: 'Re-enter password',
    passwordMismatch: 'Passwords do not match',
    passwordRule: 'Password must include letters and numbers',
    passwordMinLengthError: 'Password must be at least 6 characters',
    applyNow: 'Apply Now',
    backToDetails: 'Back',
    dontShowAgain: "Don't show for 15 days",
    submitting: 'Submitting your application...',
    submittingStep1: 'Initializing your request...',
    submittingStep2: 'Your application has been submitted to the backend...',
    submittingStep3: 'We are verifying your account and details...',
    submittingStep4: 'Please do not close this window...',
    submittingStep5: 'Usually only 30–40 seconds to complete.',
    submittingStep6: 'Please keep this window open until finished.',
    submittingStep7: 'Processing your application, almost there...',
    submittingStep8: 'Do not close or refresh this page.',
    submittingWarning: 'Please wait. Closing or refreshing will interrupt the process.',
    successTitle: 'Shareholder & Agent Approved',
    successMsg: 'Your account is being set up. Please wait...',
    successCongrats: 'Congratulations! Your application has been approved. Below is your login information:',
    successFirstLoginHint: 'On first login, please bind your phone number or email and change your password.',
    copyAll: 'Copy',
    copied: 'Copied!',
    winboxAgentLogin: 'Winbox Agent Login',
    errorTitle: 'Something went wrong',
    uidUnavailableTitle: 'UID not available',
    uidUnavailableMessage: 'This UID is already taken or invalid. Please choose a different UID and try again.',
    retry: 'Try Again',
    close: 'Close',
    errorBusyPrefix: 'Too many applications at the moment. Please contact ',
    errorBusyLink: 'Telegram Winbox @wbxmalay',
    errorBusySuffix: ' for assistance.',
  },
  zh: {
    title: 'Winbox 官方股东代理招募计划',
    subtitle: '活动时间：即日起至 2026 年 3 月 3 日（元宵节）止。官方直接申请，保障代理权益，佣金透明安全。',
    earnCommission: '限时激励',
    commissionRate: '新年红包计划，奖励高达 1,000 MYR',
    description: '把握元宵前的最后红利期，开启您的全球盈利之路。',
    redPacketDisclaimer: '提示：活跃度高的股东优先发放红包。',
    joinNow: '股东代理注册',
    alreadyMember: '股东代理登录',
    agentApplication: '立即申请 — Winbox 股东/代理',
    fillDetails: '填写您的详细信息以开始',
    nickname: '昵称',
    nicknamePlaceholder: '您的昵称',
    uid: 'UID/账号',
    uidPlaceholder: 'Winbox UID/账号',
    uidPrefixError: 'UID 不能以 win 或 wb 开头',
    uidRuleError: 'UID 须同时包含字母和数字',
    uidFirstCharError: 'UID 首位不能为数字',
    uidMinLengthError: '用户名至少 6 位',
    uidContainsC8Error: '用户名不能包含 c8',
    password: '密码',
    passwordPlaceholder: '设置密码',
    confirmPassword: '确认密码',
    confirmPasswordPlaceholder: '再次输入密码',
    passwordMismatch: '两次密码不一致',
    passwordRule: '密码须同时包含字母和数字',
    passwordMinLengthError: '密码至少 6 位',
    applyNow: '立即申请',
    backToDetails: '返回',
    dontShowAgain: '15天内不再显示',
    submitting: '正在提交您的申请...',
    submittingStep1: '正在初始化，请稍候...',
    submittingStep2: '您的申请已提交到后台...',
    submittingStep3: '正在检验账户和资料...',
    submittingStep4: '请不要关闭此窗口...',
    submittingStep5: '一般只需等待 30–40 秒即可完成。',
    submittingStep6: '请保持此窗口打开直至完成。',
    submittingStep7: '正在处理您的申请，请稍候...',
    submittingStep8: '请勿关闭或刷新此页面。',
    submittingWarning: '请耐心等待，关闭或刷新页面将中断处理,一般只需等待 30–40 秒即可完成。',
    successTitle: '股东代理审核通过',
    successMsg: '正在为您开通账户，请稍候...',
    successCongrats: '恭喜，您的申请已经通过，下面是您的登陆信息：',
    successFirstLoginHint: '首次登陆时请绑定手机号或邮箱，并修改密码。',
    copyAll: '复制',
    copied: '已复制',
    winboxAgentLogin: 'Winbox代理登陆',
    errorTitle: '申请未通过',
    uidUnavailableTitle: 'UID 不可用',
    uidUnavailableMessage: '该 UID 已存在或不符合要求，请更换一个 UID 后再试。',
    retry: '重试',
    close: '关闭',
    errorBusyPrefix: '当前申请人数过多，请联系 ',
    errorBusyLink: 'Telegram Winbox @wbxmalay',
    errorBusySuffix: ' 进行处理。',
  },
  ms: {
    title: 'Program Rasmi Pemegang Saham & Ejen Winbox',
    subtitle: 'Sehingga 3 Mac 2026 (Perayaan Tanglung). Permohonan terus rasmi—komisen telus, hak terjamin. Sertai sebelum tamat untuk Ang Pao Tahun Baru sehingga 1,000 MYR.',
    earnCommission: 'Insentif Masa Terhad',
    commissionRate: 'Ang Pao Tahun Baru sehingga 1,000 MYR',
    description: 'Rebut peluang terakhir sebelum Perayaan Tanglung dan mulakan perjalanan pendapatan global anda.',
    redPacketDisclaimer: 'Nota: Ang Pao diutamakan untuk pemegang saham dengan aktiviti lebih tinggi.',
    joinNow: 'Sertai Sekarang',
    alreadyMember: 'Log Masuk Ahli',
    agentApplication: 'Mohon Sekarang — Pemegang Saham & Ejen Winbox',
    fillDetails: 'Isi maklumat anda untuk bermula',
    nickname: 'Nama Gelaran',
    nicknamePlaceholder: 'Nama gelaran anda',
    uid: 'UID',
    uidPlaceholder: 'UID Winbox',
    uidPrefixError: 'UID tidak boleh bermula dengan win atau wb',
    uidRuleError: 'UID mesti mengandungi huruf dan nombor',
    uidFirstCharError: 'Aksara pertama UID tidak boleh nombor',
    uidMinLengthError: 'UID mesti sekurang-kurangnya 6 aksara',
    uidContainsC8Error: 'UID tidak boleh mengandungi c8',
    password: 'Kata Laluan',
    passwordPlaceholder: 'Tetapkan kata laluan',
    confirmPassword: 'Sahkan Kata Laluan',
    confirmPasswordPlaceholder: 'Masukkan semula kata laluan',
    passwordMismatch: 'Kata laluan tidak sepadan',
    passwordRule: 'Kata laluan mesti mengandungi huruf dan nombor',
    passwordMinLengthError: 'Kata laluan mesti sekurang-kurangnya 6 aksara',
    applyNow: 'Mohon Sekarang',
    backToDetails: 'Kembali',
    dontShowAgain: 'Jangan paparkan selama 15 hari',
    submitting: 'Menghantar permohonan anda...',
    submittingStep1: 'Memulakan permohonan anda...',
    submittingStep2: 'Permohonan anda telah dihantar ke sistem...',
    submittingStep3: 'Sedang mengesahkan akaun dan maklumat anda...',
    submittingStep4: 'Sila jangan tutup tetingkap ini...',
    submittingStep5: 'Biasanya hanya 30–60 saat untuk selesai.',
    submittingStep6: 'Sila kekalkan tetingkap ini terbuka sehingga selesai.',
    submittingStep7: 'Memproses permohonan anda, hampir selesai...',
    submittingStep8: 'Jangan tutup atau segar semula halaman ini.',
    submittingWarning: 'Sila tunggu. Menutup atau menyegar semula akan menyekat proses.',
    successTitle: 'Pemegang Saham & Ejen Diluluskan',
    successMsg: 'Akaun anda sedang disiapkan. Sila tunggu...',
    successCongrats: 'Tahniah! Permohonan anda telah diluluskan. Berikut adalah maklumat log masuk anda:',
    successFirstLoginHint: 'Pada log masuk pertama, sila ikat nombor telefon atau e-mel dan tukar kata laluan.',
    copyAll: 'Salin',
    copied: 'Disalin!',
    winboxAgentLogin: 'Winbox Agent Login',
    errorTitle: 'Sesuatu tidak kena',
    uidUnavailableTitle: 'UID tidak tersedia',
    uidUnavailableMessage: 'UID ini telah digunakan atau tidak sah. Sila tukar kepada UID lain dan cuba lagi.',
    retry: 'Cuba Lagi',
    close: 'Tutup',
    errorBusyPrefix: 'Terlalu banyak permohonan. Sila hubungi ',
    errorBusyLink: 'Telegram Winbox @wbxmalay',
    errorBusySuffix: ' untuk bantuan.',
  },
};

const AgentApplyPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState<'cta' | 'form' | 'submitting' | 'success' | 'error'>('cta');
  const [nickname, setNickname] = useState('');
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 密码至少 6 位，且须同时包含字母和数字（与后台校验一致）
  const passwordValid = (p: string) => p.length >= 6 && /[a-zA-Z]/.test(p) && /\d/.test(p);

  // UID：至少 6 位，不能包含 c8，首位不能为数字，不能以 win/wb 开头，须同时包含字母和数字
  const uidError = (u: string): 'minLength' | 'containsC8' | 'firstChar' | 'prefix' | 'alphanumeric' | null => {
    const s = u.trim();
    if (!s) return null;
    if (s.length < 6) return 'minLength';
    if (/c8/i.test(s)) return 'containsC8';
    if (/^\d/.test(s)) return 'firstChar';
    if (/^(win|wb)/i.test(s)) return 'prefix';
    if (!/[a-zA-Z]/.test(s) || !/\d/.test(s)) return 'alphanumeric';
    return null;
  };
  const uidValid = (u: string) => u.trim().length > 0 && !uidError(u);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [requestId, setRequestId] = useState<string | null>(null);
  const [resultMessage, setResultMessage] = useState('');
  const [pollTimer, setPollTimer] = useState<number | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [submittingStepIndex, setSubmittingStepIndex] = useState(0);
  const [errorType, setErrorType] = useState<'generic' | 'uid_unavailable'>('generic');

  // 成功开通过后 7 天内不再弹窗的 Cookie 配置
  const SUCCESS_COOKIE_NAME =
    POPUP_CONFIG.agentApplyPopup.successCookieName ||
    `${POPUP_CONFIG.agentApplyPopup.cookieName}_success`;
  const SUCCESS_COOKIE_DAYS =
    POPUP_CONFIG.agentApplyPopup.successCooldownDays ?? 7;

  // 提交中状态下的动态提示轮换
  React.useEffect(() => {
    if (view !== 'submitting') return;
    const interval = setInterval(() => {
      setSubmittingStepIndex((i) => (i + 1) % 8);
    }, 2200);
    return () => clearInterval(interval);
  }, [view]);

  // 提交中若用户关闭/刷新，将任务标为已取消（便于 worker 跳过）
  const cancelRequestIfSubmitting = React.useCallback(() => {
    if (requestId && view === 'submitting') {
      const { supabase } = POPUP_CONFIG;
      fetch(`${supabase.url}/rest/v1/agent_requests?id=eq.${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabase.anonKey,
          'Authorization': `Bearer ${supabase.anonKey}`,
        },
        body: JSON.stringify({ status: 'cancelled', result_message: 'User closed' }),
        keepalive: true,
      }).catch(() => {});
    }
  }, [requestId, view]);

  useEffect(() => {
    const onBeforeUnload = () => cancelRequestIfSubmitting();
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [cancelRequestIfSubmitting]);

  // 将 resultMessage 解析为一行一行的登录信息（用于成功页展示与复制）
  const getSuccessLines = (): string[] => {
    if (!resultMessage || !resultMessage.trim()) return [];
    const raw = resultMessage.replace(/^Account created\.\s*/i, '').trim();
    return raw.split(/\s*,\s*/).filter(Boolean);
  };

  // 在 Account 行下方插入用户输入的密码，用于成功页展示与复制
  const getSuccessLinesWithPassword = (): string[] => {
    const lines = getSuccessLines();
    const out: string[] = [];
    for (const line of lines) {
      out.push(line);
      if (/^Account:\s*/i.test(line)) out.push(`Password: ${password}`);
    }
    return out;
  };

  const handleCopySuccess = () => {
    const lines = [
      `Account: ${uid}`,
      `Password: ${password}`,
    ];
    const text = lines.join('\n');

    // Safari / iOS 下 clipboard API 常无效，直接用 execCommand（同步、同一次用户操作内完成）
    const isSafari = /Safari/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent);
    const copyFallback = (str: string) => {
      const el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      try {
        const ok = document.execCommand('copy');
        if (ok) {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        }
      } catch (e) {
        console.error('Copy failed', e);
      }
      document.body.removeChild(el);
    };

    if (isSafari) {
      copyFallback(text);
      return;
    }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }).catch(() => copyFallback(text));
    } else {
      copyFallback(text);
    }
  };

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) {
      setLanguage('zh');
    } else if (browserLang.startsWith('ms')) {
      setLanguage('ms');
    } else {
      setLanguage('en');
    }

    // 1. Check config
    if (!POPUP_CONFIG.agentApplyPopup.enabled) {
      return;
    }

    // 2. Check localStorage for suppression（用户主动勾选「15 天不再显示」）
    const hiddenUntil = localStorage.getItem(POPUP_CONFIG.agentApplyPopup.cookieName);
    if (hiddenUntil) {
      if (parseInt(hiddenUntil) > Date.now()) {
        return; // Still suppressed
      } else {
        localStorage.removeItem(POPUP_CONFIG.agentApplyPopup.cookieName); // Expired
      }
    }

    // 2.2 若最近 7 天内成功开通过，也不再弹窗
    const successHiddenUntil = localStorage.getItem(SUCCESS_COOKIE_NAME);
    if (successHiddenUntil) {
      if (parseInt(successHiddenUntil) > Date.now()) {
        return; // Recently completed, suppress popup for this browser
      } else {
        localStorage.removeItem(SUCCESS_COOKIE_NAME); // Expired
      }
    }

    // 3. Show popup
    setVisible(true);
  }, []);

  const handleClose = () => {
    if (view === 'submitting' && requestId) {
      cancelRequestIfSubmitting();
    }
    if (dontShowAgain) {
      const expireTime = Date.now() + POPUP_CONFIG.agentApplyPopup.cookieExpireDays * 24 * 60 * 60 * 1000;
      localStorage.setItem(POPUP_CONFIG.agentApplyPopup.cookieName, expireTime.toString());
    }
    setVisible(false);
  };

  const handleJoinNow = () => {
    setView('form');
  };

  const handleApply = async () => {
    if (!nickname.trim() || !uid.trim() || !password.trim() || !confirmPassword.trim()) return;
    if (uidError(uid)) return;
    if (!passwordValid(password)) return;
    if (password !== confirmPassword) return;
    
    setView('submitting');
    
    try {
      const { supabase } = POPUP_CONFIG;
      const response = await fetch(`${supabase.url}/rest/v1/agent_requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabase.anonKey,
          'Authorization': `Bearer ${supabase.anonKey}`,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify({
          nickname: nickname.trim(),
          uid: uid.trim(),
          password: password.trim(),
          status: 'pending',
        }),
      });

      if (!response.ok) {
        throw new Error('Submit failed');
      }

      const data = await response.json();
      const newId = data[0]?.id;
      if (!newId) throw new Error('No ID returned');

      setRequestId(newId);

      // 开始轮询状态
      const timer = window.setInterval(async () => {
        try {
          const pollRes = await fetch(
            `${supabase.url}/rest/v1/agent_requests?id=eq.${newId}&select=status,result_message`,
            {
              headers: {
                'apikey': supabase.anonKey,
                'Authorization': `Bearer ${supabase.anonKey}`,
              },
            }
          );
          const pollData = await pollRes.json();
          const record = pollData[0];
          if (record) {
            if (record.status === 'completed') {
              setResultMessage(record.result_message || 'Account created successfully!');
              // 成功开通过后，7 天内不再弹窗
              const expireTime = Date.now() + SUCCESS_COOKIE_DAYS * 24 * 60 * 60 * 1000;
              localStorage.setItem(SUCCESS_COOKIE_NAME, expireTime.toString());
              setView('success');
              window.clearInterval(timer);
            } else if (record.status === 'failed') {
              const msg = record.result_message || 'Processing failed.';
              setResultMessage(msg);
              // 如果后台返回 UID Unavailable，则提示用户更换 UID 再试
              if (/uid unavailable/i.test(msg)) {
                setErrorType('uid_unavailable');
              } else {
                setErrorType('generic');
              }
              setView('error');
              window.clearInterval(timer);
            }
          }
        } catch (e) {
          // 轮询出错，继续等待
        }
      }, 5000);

      setPollTimer(timer);

    } catch (error) {
      console.error('Submit error:', error);
      setResultMessage('Network error. Please try again.');
      setView('error');
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
       // Do nothing
    }
  };

  const t = TRANSLATIONS[language];

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/50 p-0 sm:p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-[90%] max-w-[460px] min-h-[520px] h-auto max-h-[92vh] rounded-[4px] bg-white shadow-xl overflow-y-auto flex flex-col antialiased"
        style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Segoe UI,Arial,Roboto,'PingFang SC',miui,'Hiragino Sans GB','Microsoft Yahei',sans-serif" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Language Switcher */}
        <div className="absolute top-[10px] right-[10px] z-10">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="appearance-none bg-white border border-[#ddd] text-gray-700 text-xs px-2 py-1 rounded-[4px] focus:outline-none cursor-pointer"
          >
            <option value="en">EN</option>
            <option value="zh">ZH</option>
            <option value="ms">MS</option>
          </select>
        </div>

        {/* 内容区：整体上下居中 */}
        <div className="flex-1 flex flex-col justify-center min-h-0">
        {/* Header / Logo */}
        <div className="flex flex-col items-center justify-center pt-6 pb-3 px-6">
          <img src={ASSETS.logo} alt="Winbox" className="w-[90px] h-[90px] mb-3" />
          {view !== 'form' && (
            <>
              <h2 className="text-base font-bold text-[#323233] text-center mb-1">{t.title}</h2>
              <p className="text-[#969799] text-xs text-center">{t.subtitle}</p>
            </>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col px-6 pb-5">
          {view === 'cta' ? (
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-3 w-full">
                <div className="bg-[#edfcff] border border-[#1278b6] rounded-[4px] p-3 w-full">
                    <h3 className="text-sm font-bold text-[#1278b6] mb-1">{t.earnCommission}</h3>
                    <p className="text-xs text-[#1278b6]/80 font-medium">
                    {t.commissionRate}
                    </p>
                </div>
                <p className="text-[#969799] text-xs px-2 leading-relaxed">
                  {t.description}
                </p>
                <p className="text-[#969799] text-[11px] px-2 leading-relaxed italic">
                  {t.redPacketDisclaimer}
                </p>
              </div>

              <div className="w-full flex gap-[0.45rem] mt-3">
                <button
                  onClick={handleClose}
                  className="flex-1 h-[40px] rounded-[4px] text-white text-sm font-medium leading-[40px]"
                  style={{ backgroundColor: '#208bca' }}
                >
                  {t.alreadyMember}
                </button>
                <button
                  onClick={handleJoinNow}
                  className="flex-1 h-[40px] rounded-[4px] text-white text-sm font-medium leading-[40px]"
                  style={{ backgroundColor: '#9816f4' }}
                >
                  {t.joinNow}
                </button>
              </div>
            </div>
          ) : view === 'form' ? (
            <div className="flex flex-col animate-in slide-in-from-right-8 duration-300">
              <div className="text-center mb-4">
                <h3 className="text-sm font-bold text-[#323233]">{t.agentApplication}</h3>
                <p className="text-xs text-[#969799] mt-1">{t.fillDetails}</p>
              </div>

              <div className="flex flex-col">
                {/* Nickname Input */}
                <div className="flex items-center border-b border-gray-200 pb-2 mb-3">
                    <img src={ASSETS.nicknameIcon} alt="" className="w-[24px] h-[24px] flex-shrink-0 ml-[15px]" />
                    <div className="w-px h-[14px] bg-[rgb(217,210,200)] mx-3 flex-shrink-0"></div>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder={t.nicknamePlaceholder}
                        className="flex-1 min-w-0 w-full text-[14px] text-[#323233] outline-none border-0 bg-transparent p-0 m-0 text-left font-medium placeholder:text-[#b2b6c1] placeholder:font-medium"
                    />
                </div>
                
                {/* UID Input */}
                <div className="flex items-center border-b border-gray-200 pb-2 mb-3">
                    <img src={ASSETS.userIcon} alt="" className="w-[24px] h-[24px] flex-shrink-0 ml-[15px]" />
                    <div className="w-px h-[14px] bg-[rgb(217,210,200)] mx-3 flex-shrink-0"></div>
                    <input
                        type="text"
                        value={uid}
                        onChange={(e) => setUid(e.target.value)}
                        placeholder={t.uidPlaceholder}
                        className="flex-1 min-w-0 w-full text-[14px] text-[#323233] outline-none border-0 bg-transparent p-0 m-0 text-left font-medium placeholder:text-[#b2b6c1] placeholder:font-medium"
                    />
                </div>
                {uid.trim().length > 0 && uidError(uid) === 'minLength' && (
                  <p className="text-xs text-red-500 ml-[60px] mb-1">{t.uidMinLengthError}</p>
                )}
                {uid.trim().length > 0 && uidError(uid) === 'containsC8' && (
                  <p className="text-xs text-red-500 ml-[60px] mb-1">{t.uidContainsC8Error}</p>
                )}
                {uid.trim().length > 0 && uidError(uid) === 'firstChar' && (
                  <p className="text-xs text-red-500 ml-[60px] mb-1">{t.uidFirstCharError}</p>
                )}
                {uid.trim().length > 0 && uidError(uid) === 'prefix' && (
                  <p className="text-xs text-red-500 ml-[60px] mb-1">{t.uidPrefixError}</p>
                )}
                {uid.trim().length > 0 && uidError(uid) === 'alphanumeric' && (
                  <p className="text-xs text-red-500 ml-[60px] mb-1">{t.uidRuleError}</p>
                )}

                {/* Password Input */}
                <div className="flex items-center border-b border-gray-200 pb-2 mb-3">
                    <img src={ASSETS.passwordIcon} alt="" className="w-[24px] h-[24px] flex-shrink-0 ml-[15px]" />
                    <div className="w-px h-[14px] bg-[rgb(217,210,200)] mx-3 flex-shrink-0"></div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t.passwordPlaceholder}
                        className="flex-1 min-w-0 w-full text-[14px] text-[#323233] outline-none border-0 bg-transparent p-0 m-0 text-left font-medium placeholder:text-[#b2b6c1] placeholder:font-medium"
                    />
                </div>
                {/* Password rule hint */}
                {password.length > 0 && password.length < 6 && (
                  <p className="text-xs text-red-500 ml-[60px] mb-1">{t.passwordMinLengthError}</p>
                )}
                {password.length >= 6 && !passwordValid(password) && (
                  <p className="text-xs text-red-500 ml-[60px] mb-1">{t.passwordRule}</p>
                )}

                {/* Confirm Password Input */}
                <div className="flex items-center border-b border-gray-200 pb-2 mb-2">
                    <img src={ASSETS.passwordIcon} alt="" className="w-[24px] h-[24px] flex-shrink-0 ml-[15px]" />
                    <div className="w-px h-[14px] bg-[rgb(217,210,200)] mx-3 flex-shrink-0"></div>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={t.confirmPasswordPlaceholder}
                        className="flex-1 min-w-0 w-full text-[14px] text-[#323233] outline-none border-0 bg-transparent p-0 m-0 text-left font-medium placeholder:text-[#b2b6c1] placeholder:font-medium"
                    />
                </div>
                {/* Password mismatch hint */}
                {confirmPassword.length > 0 && password !== confirmPassword && (
                    <p className="text-xs text-red-500 ml-[60px]">{t.passwordMismatch}</p>
                )}
                <div className="mb-4" />
              </div>

              <div className="flex gap-[0.45rem] mt-2">
                <button 
                    onClick={() => setView('cta')}
                    className="flex-1 h-[40px] rounded-[4px] text-white text-sm font-medium leading-[40px]"
                    style={{ backgroundColor: '#208bca' }}
                >
                    {t.backToDetails}
                </button>
                <button
                    onClick={handleApply}
                    disabled={!nickname.trim() || !uid.trim() || !uidValid(uid) || !password.trim() || !confirmPassword.trim() || !passwordValid(password) || password !== confirmPassword}
                    className="flex-1 h-[40px] rounded-[4px] text-white text-sm font-medium leading-[40px] disabled:opacity-50"
                    style={{ backgroundColor: '#9816f4' }}
                >
                    {t.applyNow}
                </button>
              </div>
            </div>
          ) : view === 'submitting' ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-10 h-10 border-4 border-[#9816f4]/30 border-t-[#9816f4] rounded-full animate-spin"></div>
              <p className="text-sm font-medium text-[#323233] text-center">
                {[t.submittingStep1, t.submittingStep2, t.submittingStep3, t.submittingStep4, t.submittingStep5, t.submittingStep6, t.submittingStep7, t.submittingStep8][submittingStepIndex]}
              </p>
              <p className="text-xs text-red-500 text-center px-6 max-w-[280px]">
                {t.submittingWarning}
              </p>
            </div>
          ) : view === 'success' ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-[#323233]">{t.successTitle}</h3>
              <p className="text-xs text-[#969799] text-center px-4">{t.successCongrats}</p>
              <div className="w-full px-6 py-3 bg-gray-50 rounded-[4px] text-left space-y-1">
                <p className="text-[13px] text-[#323233] font-bold">{`Account: ${uid}`}</p>
                <p className="text-[13px] text-[#323233] font-bold">{`Password: ${password}`}</p>
                <p className="text-xs text-red-500 mt-2">{t.successFirstLoginHint}</p>
                <button
                  type="button"
                  onClick={handleCopySuccess}
                  className="text-xs text-[#1278b6] font-medium border border-[#1278b6] rounded-[4px] px-4 py-2 mt-2 hover:bg-[#edfcff]"
                >
                  {copySuccess ? t.copied : t.copyAll}
                </button>
              </div>
              <button
                onClick={handleClose}
                className="mt-3 h-[40px] w-full rounded-[4px] text-white text-sm font-medium"
                style={{ backgroundColor: '#208bca' }}
              >
                {t.winboxAgentLogin}
              </button>
            </div>
          ) : view === 'error' ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-[#323233]">
                {errorType === 'uid_unavailable' ? t.uidUnavailableTitle : t.errorTitle}
              </h3>
              {errorType === 'uid_unavailable' ? (
                <p className="text-xs text-[#969799] text-center px-4 leading-relaxed">
                  {t.uidUnavailableMessage}
                </p>
              ) : (
                <p className="text-xs text-[#969799] text-center px-4 leading-relaxed">
                  {t.errorBusyPrefix}
                  <a
                    href="https://t.me/wbxmalay"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[#1278b6] font-medium underline hover:no-underline"
                  >
                    {t.errorBusyLink}
                  </a>
                  {t.errorBusySuffix}
                </p>
              )}
              <button
                onClick={() => {
                  setErrorType('generic');
                  setView('form');
                }}
                className="mt-3 h-[40px] w-full rounded-[4px] text-white text-sm font-medium"
                style={{ backgroundColor: '#9816f4' }}
              >
                {t.retry}
              </button>
            </div>
          ) : null}

          {/* Footer - Cookie Consent (只在 cta 和 form 视图显示) */}
          {(view === 'cta' || view === 'form') && (
          <div className="mt-5 flex items-center justify-center">
            <label className="flex items-center space-x-2 cursor-pointer group select-none">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  className="peer sr-only"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                />
                <div className="w-4 h-4 border border-gray-300 rounded transition-colors peer-checked:bg-[#1989fa] peer-checked:border-[#1989fa]"></div>
                <svg className="absolute w-2.5 h-2.5 text-white left-0.5 top-1 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs text-[#969799] group-hover:text-gray-600 transition-colors">
                {t.dontShowAgain}
              </span>
            </label>
          </div>
          )}
        </div>

        </div>
        {/* Close button */}
        {/* But keeping a subtle close cross just in case user gets stuck in Form view without wanting to submit */}
        <button 
          onClick={handleClose}
          className="absolute top-[10px] left-[10px] text-[#c8c9cc] p-2 hover:text-[#969799] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AgentApplyPopup;
