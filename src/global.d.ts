import type en from './messages/en.json';

declare module 'next-intl' {
  type AppConfig = {
    Messages: typeof en;
  };
}
