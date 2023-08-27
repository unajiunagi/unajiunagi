import type { Meta, StoryObj } from "@storybook/react";
import { ChangecreatorModeButton } from "./ChangecreatorModeButton";

const meta: Meta<typeof ChangecreatorModeButton> = {
  component: ChangecreatorModeButton,
};
export default meta;

export const Default: StoryObj<typeof ChangecreatorModeButton> = {
  args: {},
  name: "デフォルト",
};
