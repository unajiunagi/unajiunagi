import type { Meta, StoryObj } from "@storybook/react";
import { EmailAuthGuardProvider } from "./EmailAuthGuardProvider";

const meta: Meta<typeof EmailAuthGuardProvider> = {
  component: EmailAuthGuardProvider,
};
export default meta;

export const Default: StoryObj<typeof EmailAuthGuardProvider> = {
  args: {},
  name: "デフォルト",
};
