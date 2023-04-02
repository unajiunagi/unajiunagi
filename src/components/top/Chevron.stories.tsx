import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Chevron } from "./Chevron";

export default {
  component: Chevron,
} as ComponentMeta<typeof Chevron>;

type Template = ComponentStoryObj<typeof Chevron>;

export const Default: Template = {
  args: {
    label: "Default",
    name: "default",
  },
  storyName: "デフォルト",
};
