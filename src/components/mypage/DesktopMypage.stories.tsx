import type { Meta, StoryObj } from "@storybook/react"
import { DesktopMypage } from "./DesktopMypage"

const meta: Meta<typeof DesktopMypage> = {
  component: DesktopMypage,
}
export default meta

export const Default: StoryObj<typeof DesktopMypage> = {
  args: {

  },
  name: "デフォルト",
};
