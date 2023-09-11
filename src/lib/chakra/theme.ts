import { extendTheme } from "@chakra-ui/react";
import { Noto_Sans_JP } from "@next/font/google";

// フォントの設定
const notojp = Noto_Sans_JP({
  weight: ["500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default extendTheme({
  colors: {
    brand: "#1a1a1a",
  },
  fonts: {
    body: notojp.style.fontFamily,
    heading: notojp.style.fontFamily,
  },
});
