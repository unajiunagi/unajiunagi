export const pagesPath = {
  _id: (id: string | number) => ({
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/[id]' as const, query: { id }, hash: url?.hash })
  }),
  "auth": {
    "resetPassword": {
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/auth/resetPassword' as const, hash: url?.hash })
    },
    "setNewPassword": {
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/auth/setNewPassword' as const, hash: url?.hash })
    },
    "signin": {
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/auth/signin' as const, hash: url?.hash })
    },
    "signup": {
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/auth/signup' as const, hash: url?.hash })
    }
  },
  "creator": {
    "managementVideo": {
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/creator/managementVideo' as const, hash: url?.hash })
    },
    "uploadVideo": {
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/creator/uploadVideo' as const, hash: url?.hash })
    },
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/creator' as const, hash: url?.hash })
  },
  "document": {
    "commercialTransaction": {
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/document/commercialTransaction' as const, hash: url?.hash })
    },
    "privacy": {
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/document/privacy' as const, hash: url?.hash })
    },
    "terms": {
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/document/terms' as const, hash: url?.hash })
    }
  },
  "myitem": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/myitem' as const, hash: url?.hash })
  },
  "mylist": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/mylist' as const, hash: url?.hash })
  },
  "mypage": {
    "changeEmail": {
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/mypage/changeEmail' as const, hash: url?.hash })
    },
    "changePassword": {
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/mypage/changePassword' as const, hash: url?.hash })
    },
    "deleteAccount": {
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/mypage/deleteAccount' as const, hash: url?.hash })
    },
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/mypage' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/' as const, hash: url?.hash })
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  favicons: {
    android_chrome_192x192_png: '/favicons/android-chrome-192x192.png',
    android_chrome_512x512_png: '/favicons/android-chrome-512x512.png',
    apple_touch_icon_png: '/favicons/apple-touch-icon.png',
    favicon_16x16_png: '/favicons/favicon-16x16.png',
    favicon_32x32_png: '/favicons/favicon-32x32.png',
    favicon_ico: '/favicons/favicon.ico',
    site_webmanifest: '/favicons/site.webmanifest'
  },
  logo_jpg: '/logo.jpg',
  logo_png: '/logo.png',
  logo_svg: '/logo.svg'
} as const;

export type StaticPath = typeof staticPath;
