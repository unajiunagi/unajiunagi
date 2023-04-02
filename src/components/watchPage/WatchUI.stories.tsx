import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { WatchUI } from "./WatchUI";

export default {
  component: WatchUI,
} as ComponentMeta<typeof WatchUI>;

type Template = ComponentStoryObj<typeof WatchUI>;

export const Default: Template = {
  args: {
    label: "Default",
    name: "default",
  },
  storyName: "デフォルト",
};
