import type { Meta, StoryObj } from "@storybook/react"
import { MobileHeaderBurgar } from "./MobileHeaderBurgar"

const meta: Meta<typeof MobileHeaderBurgar> = {
  component: MobileHeaderBurgar,
}
export default meta

export const Default: StoryObj<typeof MobileHeaderBurgar> = {
  args: {},
  name: "デフォルト",
};
