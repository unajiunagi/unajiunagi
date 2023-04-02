import type { Meta, StoryObj } from "@storybook/react"
import { Cast } from "./Cast"

const meta: Meta<typeof Cast> = {
  component: Cast,
}
export default meta

export const Default: StoryObj<typeof Cast> = {
  args: {},
  name: "デフォルト",
};
