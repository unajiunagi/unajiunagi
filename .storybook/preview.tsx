// chakraUIに対応
import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StoryContext } from "@storybook/react";
// next-routerに対応
import { RouterContext } from "next/dist/shared/lib/router-context";
// next/imageに対応
import * as nextImage from "next/image";
import "../src/styles/globals.scss";

// chakraUIを使えるように
export const globalTypes = {
  direction: {
    name: "Direction",
    description: "Direction for layout",
    defaultValue: "LTR",
    toolbar: {
      icon: "globe",
      items: ["LTR", "RTL"],
    },
  },
};

const withChakra = (StoryFn: Function, context: StoryContext) => {
  const { direction } = context.globals;
  const dir = direction.toLowerCase();

  return (
    <ChakraProvider theme={extendTheme({ direction: dir })}>
      <div dir={dir} id="story-wrapper" style={{ minHeight: "100vh" }}>
        <StoryFn />
      </div>
    </ChakraProvider>
  );
};

export const decorators = [withChakra];

// next/imageに対応
Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: (props) => {
    return <img {...props} />;
  },
});

// レスポンシブデザインに
const customViewports = {
  /** iPhone X */
  base: {
    name: "base",
    styles: {
      width: "375px",
      height: "812px",
    },
    type: "mobile",
  },
  /** iPad */
  md: {
    name: "md",
    styles: {
      width: "768px",
      height: "1024px",
    },
    type: "tablet",
  },
  /** MacBook Air */
  lg: {
    name: "lg",
    styles: {
      width: "1280px",
      height: "800px",
    },
    type: "desktop",
  },
};

// デフォルトであるやつ
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // next-routerに対応
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};
