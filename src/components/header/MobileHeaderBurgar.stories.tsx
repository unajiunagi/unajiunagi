import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { MobileHeaderBurgar } from "./MobileHeaderBurgar";

export default {
  component: MobileHeaderBurgar,
} as ComponentMeta<typeof MobileHeaderBurgar>;

type Template = ComponentStoryObj<typeof MobileHeaderBurgar>;

export const Default: Template = {
  args: {
    label: "Default",
    name: "default",
  },
  storyName: "デフォルト",
};
