import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { Noto_Sans_JP } from 'next/font/google';

// フォントの設定
const notojp = Noto_Sans_JP({
  weight: ['500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default extendTheme(
  withDefaultColorScheme({
    colorScheme: 'facebook',
    components: ['Button'],
  }),
  {
    components: {
      Card: {
        baseStyle: {
          container: {
            color: 'white',
            bgColor: 'black',
          },
        },
      },
      Form: {
        baseStyle: {
          helperText: {
            color: 'white',
          },
        },
      },
      Link: {
        baseStyle: {
          _hover: {
            textDecoration: 'none',
          },
        },
      },
      Breadcrumb: {
        baseStyle: {
          link: {
            _hover: {
              textDecoration: 'none',
            },
          },
        },
      },
    },
    styles: {
      global: {
        body: {
          color: 'white',
        },
      },
    },
    colors: {
      brand: '#1a1a1a',
    },
    fonts: {
      body: notojp.style.fontFamily,
      heading: notojp.style.fontFamily,
    },
  }
);
