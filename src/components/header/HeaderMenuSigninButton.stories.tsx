import type { Meta, StoryObj } from "@storybook/react";
import { HeaderMenuSigninButton } from "./HeaderMenuButton";

const meta: Meta<typeof HeaderMenuSigninButton> = {
  component: HeaderMenuSigninButton,
};
export default meta;

export const Default: StoryObj<typeof HeaderMenuSigninButton> = {
  args: {},
  name: "デフォルト",
};
