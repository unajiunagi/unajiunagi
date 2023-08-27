import type { Meta, StoryObj } from "@storybook/react";
import { creatorpageMenu } from "./creatorpageMenu";

const meta: Meta<typeof creatorpageMenu> = {
  component: creatorpageMenu,
};
export default meta;

export const Default: StoryObj<typeof creatorpageMenu> = {
  args: {},
  name: "デフォルト",
};
