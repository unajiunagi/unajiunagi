import type { Meta, StoryObj } from "@storybook/react"
import { Chevron } from "./Chevron"

const meta: Meta<typeof Chevron> = {
  component: Chevron,
}
export default meta

export const Default: StoryObj<typeof Chevron> = {
  args: {},
  name: "デフォルト",
};
