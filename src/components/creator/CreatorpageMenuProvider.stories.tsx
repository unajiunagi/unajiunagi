import type { Meta, StoryObj } from "@storybook/react";
import { CreatorpageMenuProvider } from "./CreatorpageMenuProvider";

const meta: Meta<typeof CreatorpageMenuProvider> = {
  component: CreatorpageMenuProvider,
};
export default meta;

export const Default: StoryObj<typeof CreatorpageMenuProvider> = {
  args: {},
  name: "デフォルト",
};
