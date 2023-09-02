import type { Meta, StoryObj } from "@storybook/react";
import { ChangeCreatorModeButton } from "./ChangeCreatorModeButton";

const meta: Meta<typeof ChangeCreatorModeButton> = {
  component: ChangeCreatorModeButton,
};
export default meta;

export const Default: StoryObj<typeof ChangeCreatorModeButton> = {
  args: {},
  name: "デフォルト",
};
