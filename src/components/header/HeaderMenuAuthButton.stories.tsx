import type { Meta, StoryObj } from "@storybook/react";
import { HeaderMenuAuthButton } from "components/header/HeaderMenuAuthButton";

const meta: Meta<typeof HeaderMenuAuthButton> = {
  component: HeaderMenuAuthButton,
};
export default meta;

export const Default: StoryObj<typeof HeaderMenuAuthButton> = {
  args: {},
  name: "デフォルト",
};
