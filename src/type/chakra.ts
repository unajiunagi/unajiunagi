// regenerate by running
// npx @chakra-ui/cli tokens path/to/your/theme.(js|ts) --template augmentation --out path/to/this/file
import { BaseThemeTypings } from "@chakra-ui/styled-system";
declare module "@chakra-ui/styled-system" {
  export interface CustomThemeTypings extends BaseThemeTypings {
    blur: string & {};
    borders: string & {};
    borderStyles: string & {};
    borderWidths: string & {};
    breakpoints: string & {};
    colors: string & {};
    colorSchemes: string & {};
    fonts: string & {};
    fontSizes: string & {};
    fontWeights: string & {};
    layerStyles: string & {};
    letterSpacings: string & {};
    lineHeights: string & {};
    radii: string & {};
    shadows: string & {};
    sizes: string & {};
    space: string & {};
    textStyles: string & {};
    transition: string & {};
    zIndices: string & {};
    components: {};
  }
}
