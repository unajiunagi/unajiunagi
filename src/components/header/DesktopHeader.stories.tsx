import type { Meta, StoryObj } from "@storybook/react"
import { DesktopHeader } from "./DesktopHeader";

const meta: Meta<typeof DesktopHeader> = {
  component: DesktopHeader,
};
export default meta;

export const Default: StoryObj<typeof DesktopHeader> = {
  args: {},
  name: "デフォルト",
};
