import type { Meta, StoryObj } from "@storybook/react";
import { TextArrayForm } from "./TextArrayForm";

const meta: Meta<typeof TextArrayForm> = {
  component: TextArrayForm,
};
export default meta;

export const Default: StoryObj<typeof TextArrayForm> = {
  args: {},
  name: "デフォルト",
};
