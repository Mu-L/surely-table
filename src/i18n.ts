import { createI18n } from 'vue-i18n';
import enUS from './locale/en-US';
import zhCN from './locale/zh-CN';

const getLocale = () => {
  const storedLocale = localStorage.getItem('locale');
  if (storedLocale) {
    return storedLocale;
  }
  const browserLanguage = navigator.language;
  if (browserLanguage.startsWith('zh')) {
    return 'zh-CN';
  }
  return 'en-US';
};

const i18n = createI18n({
  legacy: false,
  locale: getLocale(),
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
});

export default i18n;
