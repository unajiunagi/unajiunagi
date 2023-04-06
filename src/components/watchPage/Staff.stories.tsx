import type { Meta, StoryObj } from "@storybook/react"
import { Staff } from "./Staff"

const meta: Meta<typeof Staff> = {
  component: Staff,
}
export default meta

export const Default: StoryObj<typeof Staff> = {
  args: {},
  name: "デフォルト",
};
