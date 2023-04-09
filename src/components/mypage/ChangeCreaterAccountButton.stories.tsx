import type { Meta, StoryObj } from "@storybook/react";
import { ChangeCreaterModeButton } from "./ChangeCreaterModeButton";

const meta: Meta<typeof ChangeCreaterModeButton> = {
  component: ChangeCreaterModeButton,
};
export default meta;

export const Default: StoryObj<typeof ChangeCreaterModeButton> = {
  args: {},
  name: "デフォルト",
};
