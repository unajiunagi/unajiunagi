import type { Meta, StoryObj } from "@storybook/react"
import { MobileMypage } from "./MobileMypage"

const meta: Meta<typeof MobileMypage> = {
  component: MobileMypage,
}
export default meta

export const Default: StoryObj<typeof MobileMypage> = {
  args: {

  },
  name: "デフォルト",
};
