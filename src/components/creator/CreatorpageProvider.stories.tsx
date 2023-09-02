import type { Meta, StoryObj } from "@storybook/react";
import { creatorpageProvider } from "./creatorpageProvider";

const meta: Meta<typeof creatorpageProvider> = {
  component: creatorpageProvider,
};
export default meta;

export const Default: StoryObj<typeof creatorpageProvider> = {
  args: {},
  name: "デフォルト",
};
