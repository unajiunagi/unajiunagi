import type { Meta, StoryObj } from "@storybook/react";
import { LayoutProvider } from "./LayoutProvider";

const meta: Meta<typeof LayoutProvider> = {
  component: LayoutProvider,
};
export default meta;

export const Default: StoryObj<typeof LayoutProvider> = {
  args: {},
  name: "デフォルト",
};
