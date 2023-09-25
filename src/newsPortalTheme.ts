import 'styled-components';
import type { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface DefaultTheme {
    borderRadius: string;
    backrground: string;
    button: {
      padding: string;
      fontColor: string;
      fontSize: string;
      fontWeight: string;
      fontHeight: string;
      backrground: string;
    };
  }
}

const newsPortalTheme: DefaultTheme = {
  borderRadius: '16px',
  backrground: '#F0F4EF',
  color: '#171e15v',
  button: {
    padding: '10px 0',
    fontColor: '#F0F4EF',
    fontSize: '16px',
    fontWeight: '500',
    fontHeight: '24px',
    backrground: '#344966',
  },
};

export default newsPortalTheme;
