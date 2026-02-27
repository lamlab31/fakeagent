import React, { useState, useEffect } from 'react';
import { Popup, Button, Checkbox, Image, Space, Typography, Flex } from 'react-vant';
import { POPUP_CONFIG } from '../popup.config';

type Language = 'en' | 'zh' | 'ms';

const TRANSLATIONS = {
  en: {
    title: 'Partner Offers',
    subtitle: 'Register to enjoy welcome bonuses',
    winboxTitle: '🚀 Winbox USDT Global',
    winboxDesc: 'Lightning-fast USDT deposits! Get up to 250 USDT bonus on first deposit!',
    winboxBonus: '100% Welcome Bonus',
    bk8Title: '288% "Have You BK8?" Welcome Bonus',
    bk8Desc: 'Power up your play with 288% "Have You BK8?" Welcome Bonus and receive up to $1,000!',
    bk8Bonus: '288% Welcome Bonus',
    register: 'Register',
    dontShowAgain: "Don't show for 7 days",
  },
  zh: {
    title: '合作伙伴优惠',
    subtitle: '注册即享迎新奖励',
    winboxTitle: 'Winbox国际版 · 领250U奖励',
    winboxDesc: '极速USDT存取 | 充值就送，最高250USDT！',
    winboxBonus: '100% 迎新奖励',
    bk8Title: '288%"你BK8了吗?" 迎新奖金',
    bk8Desc: '小本金，大优惠！马上领取高达MYR 2,880 的迎新奖金。',
    bk8Bonus: '288% 迎新奖励',
    register: '领取',
    dontShowAgain: '7天内不再显示',
  },
  ms: {
    title: 'Tawaran Rakan Kongsi',
    subtitle: 'Daftar untuk bonus alu-aluan',
    winboxTitle: '🚀 Winbox USDT Global',
    winboxDesc: 'Deposit USDT kilat! Bonus sehingga 250 USDT untuk deposit pertama!',
    winboxBonus: 'Bonus 100%',
    bk8Title: '288% "Dah BK8 Ke?" Bonus Selamat Datang',
    bk8Desc: 'Tingkatkan permainan anda dengan 288% "Dah BK8 Ke?" Bonus Selamat Datang dan terima sehingga MYR 2,880!',
    bk8Bonus: 'Bonus 288%',
    register: 'Daftar',
    dontShowAgain: 'Jangan paparkan 7 hari',
  },
};

const PARTNER_LINKS = {
  winboxUsdt: 'https://h5.winbox.ink',
  bk8: 'https://www.bk8bravo.com/register?affid=61987',
};

const ASSETS = {
  winboxLogo: 'https://cdn.shopify.com/s/files/1/0440/0804/6755/files/Gemini_Generated_Image_dyorc4dyorc4dyor.png?v=1772010578&width=300',
  bk8Logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Bk8_blue_300x300.png',
};

const styles = {
  popup: {
    fontFamily: "-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Segoe UI,Arial,Roboto,'PingFang SC',miui,'Hiragino Sans GB','Microsoft Yahei',sans-serif",
  },
  header: {
    paddingTop: 32,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center' as const,
    borderBottom: '1px solid #f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#323233',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#969799',
  },
  content: {
    padding: 12,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap' as const,
    padding: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginBottom: 8,
    cursor: 'pointer',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
    flexShrink: 0,
  },
  cardContent: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#323233',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: '#969799',
    lineHeight: 1.4,
  },
  cardAction: {
    marginLeft: 8,
    flexShrink: 0,
  },
  footer: {
    padding: '8px 20px 20px',
    display: 'flex',
    justifyContent: 'center',
  },
  checkboxLabel: {
    fontSize: 12,
    color: '#969799',
  },
};

const PartnerAdsPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const config = POPUP_CONFIG.partnerAdsPopup;

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) {
      setLanguage('zh');
    } else if (browserLang.startsWith('ms')) {
      setLanguage('ms');
    } else {
      setLanguage('en');
    }

    if (!config?.enabled) {
      return;
    }

    const hiddenUntil = localStorage.getItem(config.cookieName);
    if (hiddenUntil) {
      if (parseInt(hiddenUntil) > Date.now()) {
        return;
      } else {
        localStorage.removeItem(config.cookieName);
      }
    }

    const timer = setTimeout(() => {
      setVisible(true);
    }, config.delayMs || 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    if (dontShowAgain && config) {
      const expireTime = Date.now() + config.cookieExpireDays * 24 * 60 * 60 * 1000;
      localStorage.setItem(config.cookieName, expireTime.toString());
    }
    setVisible(false);
  };

  const handlePartnerClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const t = TRANSLATIONS[language];

  return (
    <Popup
      visible={visible}
      onClose={handleClose}
      position="center"
      closeable
      closeIconPosition="top-left"
      style={{ width: '90%', maxWidth: '360px', borderRadius: 8 }}
      className="partner-ads-popup"
    >
      <div style={styles.popup}>
        {/* 头部 */}
        <div style={styles.header} className="partner-ads-header">
          <div style={styles.title} className="partner-ads-title">{t.title}</div>
          <div style={styles.subtitle} className="partner-ads-subtitle">{t.subtitle}</div>
        </div>

        {/* 合作伙伴列表 */}
        <div style={styles.content} className="partner-ads-content">
          {/* BK8 */}
          <div
            style={styles.card}
            className="partner-ads-card"
            onClick={() => handlePartnerClick(PARTNER_LINKS.bk8)}
          >
            <Image
              src={ASSETS.bk8Logo}
              alt="BK8"
              width={50}
              height={50}
              radius={8}
              fit="cover"
              style={styles.logo}
              className="partner-ads-logo"
            />
            <div style={styles.cardContent}>
              <div style={styles.cardTitle} className="partner-ads-card-title">{t.bk8Title}</div>
              <div style={styles.cardDesc} className="partner-ads-card-desc">{t.bk8Desc}</div>
            </div>
            <div style={styles.cardAction} className="partner-ads-card-action">
              <Button
                size="small"
                type="primary"
                style={{
                  backgroundColor: '#07cef8',
                  border: 'none',
                  fontSize: 12,
                  padding: '0 12px',
                  borderRadius: 5,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePartnerClick(PARTNER_LINKS.bk8);
                }}
              >
                {t.register}
              </Button>
            </div>
          </div>

          {/* Winbox USDT */}
          <div
            style={{ ...styles.card, marginBottom: 0 }}
            className="partner-ads-card"
            onClick={() => handlePartnerClick(PARTNER_LINKS.winboxUsdt)}
          >
            <Image
              src={ASSETS.winboxLogo}
              alt="Winbox USDT"
              width={50}
              height={50}
              radius={8}
              fit="cover"
              style={styles.logo}
              className="partner-ads-logo"
            />
            <div style={styles.cardContent}>
              <div style={styles.cardTitle} className="partner-ads-card-title">{t.winboxTitle}</div>
              <div style={styles.cardDesc} className="partner-ads-card-desc">{t.winboxDesc}</div>
            </div>
            <div style={styles.cardAction} className="partner-ads-card-action">
              <Button
                size="small"
                type="primary"
                style={{
                  backgroundColor: '#1278b6',
                  border: 'none',
                  fontSize: 12,
                  padding: '0 12px',
                  borderRadius: 5,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePartnerClick(PARTNER_LINKS.winboxUsdt);
                }}
              >
                {t.register}
              </Button>
            </div>
          </div>
        </div>

        {/* 底部 - 不再显示 */}
        <div style={styles.footer} className="partner-ads-footer">
          <Checkbox
            checked={dontShowAgain}
            onChange={setDontShowAgain}
            iconSize={14}
            checkedColor="#1278b6"
          >
            <span style={styles.checkboxLabel} className="partner-ads-checkbox-label">{t.dontShowAgain}</span>
          </Checkbox>
        </div>
      </div>
    </Popup>
  );
};

export default PartnerAdsPopup;
