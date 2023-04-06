import type { Meta, StoryObj } from "@storybook/react"
import { HeaderItem } from "./HeaderItem"

const meta: Meta<typeof HeaderItem> = {
  component: HeaderItem,
}
export default meta

export const Default: StoryObj<typeof HeaderItem> = {
  args: {

  },
  name: "デフォルト",
};
