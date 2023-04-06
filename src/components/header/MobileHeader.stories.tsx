import type { Meta, StoryObj } from "@storybook/react"
import { MobileHeader } from "./MobileHeader"

const meta: Meta<typeof MobileHeader> = {
  component: MobileHeader,
}
export default meta

export const Default: StoryObj<typeof MobileHeader> = {
  args: {},
  name: "デフォルト",
};
